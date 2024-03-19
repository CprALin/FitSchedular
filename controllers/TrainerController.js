const Trainer = require('../models/TrainerModel');
const User = require('../models/UserModel');
const factory = require('./HandlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
           await User.findByIdAndUpdate(user._id , {role : 'trainer'});

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


exports.updateCurrentTrainer = catchAsync(async (req , res , next) => {

     try
     {
      const trainer = await Trainer.findOne({ user : req.user._id});

      await Trainer.findByIdAndUpdate( trainer._id , {
         className : req.body.className,
         classDescription : req.body.classDescription,
         occupation : req.body.occupation,
         studies : req.body.studies
      } , { runValidators : true });

      const newTrainer = await Trainer.findOne({ user : req.user._id});

      res.status(200).json({
        status : 'success',
        data : {
           newTrainer
        }
      });

     }catch(err){
       return next(new AppError(`${err}`, 400));
     }

});

exports.getCurrentTrainer = catchAsync(async (req , res , next) => {
      try{
         const trainer = await Trainer.findOne({ user : req.user._id });

         res.status(200).json({
            status : 'success',
            data : {
               trainer
            }
         });

      }catch(err){
         return next(new AppError(`${err}` , 400));
      }
})


exports.getTrainer = factory.getOne(Trainer);
exports.getAllTrainers = factory.getAll(Trainer);
exports.updateTrainer = factory.updateOne(Trainer);
