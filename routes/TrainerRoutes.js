const express = require('express');
const TrainerRouter = require('../controllers/TrainerController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();

router.use(authController.protect);

router.get('/allTrainers' , TrainerRouter.getAllTrainers);

router.use(authController.restrictTo('admin'));

router.post('/addTrainer' , TrainerRouter.createTrainer);

router
      .route('/:id')
      .get(TrainerRouter.getTrainer)
      .patch(TrainerRouter.updateTrainer)
      .delete(TrainerRouter.deleteTrainer);

module.exports = router;