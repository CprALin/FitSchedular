const Trainer = require('../models/TrainerModel');
const User = require('../models/UserModel');
const factory = require('./HandlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { json } = require('body-parser');

exports.createTrainer = catchAsync(async (req , res , next) => {

     try{
        const email = req.body.email;

        if(!email)
        {
          return next(new AppError('Please provide email !', 400));
        }

        const user = await User.findOne({email : email});

        const existingTrainer = await Trainer.findOne({ user: user });

        if (existingTrainer) {
            return next(new AppError('Trainer with this email already exists!', 400));
        }

        if(user)
        {
           const newTrainer = await Trainer.create({
               user: user._id,
               className: 'Add a Class',
               classDescription: 'Add a Description',
               occupation: 'Add Occupation',
               studies: 'Add Studies'
           });

           res.status(200).json({
               status : 'success',
               data : {
                  newTrainer
               }
           });
        }else{
          return next(new AppError('User not found !', 400));
        }
     }catch(err){
          return next(new AppError(`${err}`, 400));
     }
});



exports.getAllTrainers = factory.getAll(Trainer);
exports.getTrainer = factory.getOne(Trainer);
exports.updateTrainer = factory.updateOne(Trainer);
exports.deleteTrainer = factory.deleteOne(Trainer);
