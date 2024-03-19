const express = require('express');
const TrainerRouter = require('../controllers/TrainerController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();

router.use(authController.protect);

router.get('/allTrainers' , TrainerRouter.getAllTrainers);
router.route('/:id').get(TrainerRouter.getTrainer)

router.patch('/updateTrainer', authController.restrictTo('trainer') , TrainerRouter.updateCurrentTrainer);

router.get('/currentTrainer/:id', authController.restrictTo('trainer'), TrainerRouter.getCurrentTrainer);

router.use(authController.restrictTo('admin'));

router.post('/addTrainer' , TrainerRouter.createTrainer);

router
      .route('/:id')
      .patch(TrainerRouter.updateTrainer)

module.exports = router;