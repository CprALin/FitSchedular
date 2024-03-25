const express = require('express');
const TrainerRouter = require('../controllers/TrainerController');
const authController = require('../controllers/AuthController');
const path = require('path');

//ROUTES
const router = express.Router();

router.get('/getTrainerPhotos/:fileName' , (req , res) => {
      const filename = req.params.fileName;
  
      const imagePath = path.join(__dirname, '../img/trainers', filename);
  
      res.sendFile(imagePath);
});

router.get('/getTrainerPhoto/:fileName' , (req, res) => {
      const filename = req.params.fileName;
  
      const imagePath = path.join(__dirname, '../img/users', filename);
  
      res.sendFile(imagePath);
});


router.get('/allTrainers' , TrainerRouter.getAllTrainers);
router.route('/:id').get(TrainerRouter.getTrainer);

router.use(authController.protect);

router.patch('/updateTrainer', authController.restrictTo('trainer') , TrainerRouter.uploadTrainerImages , TrainerRouter.resizeTrainerImages , TrainerRouter.updateCurrentTrainer);

router.get('/currentTrainer/:id', authController.restrictTo('trainer'), TrainerRouter.getCurrentTrainer);

router.use(authController.restrictTo('admin')); 

router.post('/addTrainer' , TrainerRouter.createTrainer);

router
      .route('/:id')
      .patch(TrainerRouter.updateTrainer)

module.exports = router;