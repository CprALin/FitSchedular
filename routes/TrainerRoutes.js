const express = require('express');
const TrainerRouter = require('../controllers/TrainerController');

//ROUTES
const router = express.Router();

router.route('/')
      .get(TrainerRouter.getTrainers)
      .post(TrainerRouter.createTrainer);

router
      .route('/:id')
      .get(TrainerRouter.getTrainer)
      .patch(TrainerRouter.updateTrainer)
      .delete(TrainerRouter.deleteTrainer);

module.exports = router;