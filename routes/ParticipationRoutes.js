const express = require('express');
const ParticipationRouter = require('../controllers/ParticipationController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();

router.use(authController.protect);

router.route('/')
      .get(ParticipationRouter.getParticipations)
      .post(ParticipationRouter.createParticipation);

router
      .route('/:id')
      .get(ParticipationRouter.getParticipation)
      .patch(ParticipationRouter.updateParticipation)
      .delete(ParticipationRouter.deleteParticipation);

module.exports = router;