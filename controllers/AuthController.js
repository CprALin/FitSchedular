const crypto = require('crypto');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

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
    const {name , email , password , passwordConfirm} = req.body;

    if(!name || !email || !password || !passwordConfirm)
    {
        return next(new AppError('Please provide all data !', 400));
    }

    const user = await User.findOne({email});

    if(user)
    {
        return next(new AppError('An account with this email already exist !', 400));
    }

    const userName = await User.findOne({name});

    if(userName)
    {
        return next(new AppError('Please change the name !', 400));
    }

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
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
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


exports.forgotPassword = catchAsync(async (req , res , next) => {
    // get user based on posted email 
    const user = await User.findOne({email : req.body.email});

    if(!user)
    {
        return next(new AppError('There is no user with email address.' , 404));
    }

    // generate the random token
    const resetToken = user.createPasswordResetToken();

    try{
        //dispose all validators 
        await user.save({validateBeforeSave : false});

        //send it to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

        const message = `Forgot your password ? Submit your new password to : ${resetURL} . \n If you didn't forget your password , please ignore this email !`;

        await sendEmail({
            email :  user.email,
            subject : 'Your password reset token (valid for 10 min)',
            message
        });

        res.status(200).json({
            status : 'success',
            message : 'Token sent to email !'
        });
    }catch(err){
        user.createPasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave : false});

        return next(new AppError('There was an error sending the email . Try again later !' , 500));
    }
});


exports.resetPassword = catchAsync(async (req , res, next) => {
    
    // get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ passwordResetToken : hashedToken , passwordResetExpires : { $gt : Date.now() }});

    //if token has not expired , and there is user , set the new password
    if(!user)
    {
        return next(new AppError('Token is invalid or has expired !' , 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // update changedPasswordAt property for the user

    // Log the user in 
    createSendToken(user, 200 , res);

});

exports.updatePassword = catchAsync(async (req , res , next) => {
    // get user from collection 
    const user = await User.findById(req.user.id).select('+password');
    const isCorrect = await user.correctPassword(req.body.passwordCurrent , user.password);

    if(req.body.password === '' || req.body.passwordCurrent === '' || req.body.passwordConfirm === '')
    {
        return next(new AppError('Complete all fields .', 401));
    }

    if (req.body.password === req.body.passwordCurrent) {
        return next(new AppError('New password must be different from the old one', 401));
    }

    //check if POSTed current password is correct
    if(!isCorrect)
    {
        return next(new AppError('Your current password is wrong' , 401));
    }

    if(req.body.password !== req.body.passwordConfirm)
    {
        return next(new AppError('The new password needs to be the same as the confirm password!', 401));
    }

    // if so , update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // log user in , send jwt
    createSendToken(user , 200 , res);
});



