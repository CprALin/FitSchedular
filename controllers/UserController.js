const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');

// save just allowedFields 
const filterObj = (obj , ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el))
        {
            newObj[el] = obj[el];
        }
    });

    return newObj;
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'This route is not defined ! Please use /singup instead'
    });
}

//middleware to get id user 
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    
    //check if user POSTs password data
    if(req.body.password || req.body.passwordConfirm)
    {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
    }

    const filteredBody = filterObj(req.body , 'name' , 'email');

    const updateUser = await User.findByIdAndUpdate(req.user.id , filteredBody , { new : true , runValidators : true});

    res.status(200).json({
        status : 'success',
        data : {
            user : updateUser
        }
    });
});

// just set active status to false in case the user come back 
exports.deleteMe = catchAsync(async (req , res , next) => {
    await User.findByIdAndUpdate(req.user.id , {active : false});

    res.status(204).json({
        status : 'success',
        data : null
    });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// this can not update the password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);