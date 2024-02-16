const crypto = require('crypto');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');

const singToken = id => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode , res) => {
    const token = singToken(user._id);

    const cookieOptions = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true
    }

    res.cookie('jwt' , token , cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }
    });
}

exports.singup = catchAsync(async (req , res , next) => {
    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    })

    createSendToken(newUser , 201 , res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email , password } = req.body;

    // Check if email and pass exist
    if(!email || !password)
    {
        return next(new AppError('Please provide email and password !', 400));
    }

    // Check if user exist && password is correct
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password , user.password)))
    {
        return next(new AppError('Incorect email or password !' , 401));
    }

    // If everything ok , sent token to client
    createSendToken(user , 200 , res);

});

exports.logout = (req , res) => {
    res.cookie('jwt' , 'logged out' , {
        expires : new Date(Date.now() * 10 * 1000),
        httpOnly : true
    });

    res.status(200).json({ status : 'success'});
}

exports.protect = catchAsync(async (req , res, next) => {

    let token;

    // get token
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookie.jwt){
        token = req.cookie.jwt;
    }

    //  check if exits
    if(!token)
    {
        return next(new AppError('You are not logged in ! Please login to get access . ' , 401));
    }

    // validate token - return a promise
    const decoded = await promisify(jwt.verify)(token , process.env.JWT_SECRET);

    // check if user still exist
    const currentUser = await User.findById(decoded.id);

    if(!currentUser)
    {
        return next(new AppError('The user belonging to this token does no longer exist .' , 401));
    }

    //check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat))
    {
        return next(new AppError('User recently changed password ! Please login again . ' , 401));
    }

    //grant access to protected route  
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

// only for rendered pages - no errors !
exports.isLoggedIn = async (req , res , next) => {

    if(req.cookies.jwt)
    {
        try{
            //verify token
            const decoded = await promisify(jwt.verify)(req.cookie.jwt , process.env.JWT_SECRET);

            const currentUser = await User.findById(decoded.id);

            if(!currentUser)
            {
                return next();
            }

            // check if user changed password after the token was issued
            if(currentUser.changedPasswordAfter(decoded.iat))
            {
                return next();
            }

            // there is a logged in user
            res.locals.user = currentUser;
            return next();
        }catch(err){
            return next();
        }
    }

    next();
}

exports.restrictTo = (...roles) => {
    return(req , res , next) => {
        if(!roles.includes(req.user.role))
        {
            return next(new AppError('You do not have permission to perform this action' , 403));
        }

        next();
    }
}





