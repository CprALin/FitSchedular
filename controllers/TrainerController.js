const Trainer = require('../models/TrainerModel');
const User = require('../models/UserModel');
const factory = require('./HandlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
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

exports.uploadTrainerImages = upload.fields([{ name : 'trainerPhotos' , maxCount : 3}]);    

exports.resizeTrainerImages = catchAsync(async (req , res , next) => {
    if(!req.files.trainerPhotos) return next();

    req.body.trainerPhotos = [];
    await Promise.all(
       req.files.trainerPhotos.map(async (file , i) => {
            const fileName = `trainer-${req.user.id}-${Date.now()}-${i + 1}.png`;

            await sharp(file.buffer)
               .resize(2000,1333, sharp.fit)
               .toFormat('png')
               .png({quality : 90})
               .toFile(`img/trainers/${fileName}`);

            req.body.trainerPhotos.push(fileName);
       })
    );

    next();
});

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

      const filteredBody = filterObj(req.body , 'className' , 'classDescription' , 'occupation' , 'studies');
      
      if (req.files.trainerPhotos) {     
         const imagePaths = req.files.trainerPhotos.map((file,i) => `trainer-${req.user.id}-${Date.now()}-${i + 1}.png`);
         filteredBody.trainerPhotos = imagePaths;
      }

      const updateTrainer = await Trainer.findByIdAndUpdate( trainer._id , filteredBody , { new : true , runValidators : true });

      res.status(200).json({
        status : 'success',
        data : {
           updateTrainer
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
