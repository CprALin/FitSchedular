const Trainer = require('../models/TrainerModel');
const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req , file , cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

//upload photo
const upload = multer({
    storage : multerStorage,
    fileFilter : multerFilter
});

exports.uploadUserPhoto = upload.single('photo'); 

exports.resizeUserPhoto = catchAsync(async (req , res , next) => {
    if(!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500,500, sharp.fit)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`img/users/${req.file.filename}`);

    next();
});

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

exports.deleteMe = catchAsync(async (req , res , next) => {
    const user = await User.findById(req.user.id);

    const existingTrainer = await Trainer.findOne({ user: user._id });

    if(existingTrainer)
    {
        await Trainer.findByIdAndDelete(existingTrainer._id);
    }

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
        status : 'success',
        message : 'User deleted successfully !'
    });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// this can not update the password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);