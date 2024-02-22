const express = require('express');
const ParticipationRouter = require('../controllers/ParticipationController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();

router.use(authController.protect);

router.post('/addParticipation/:appointmentId', ParticipationRouter.createParticipation);

router.route('/')
      .get(ParticipationRouter.getParticipations);

router
      .route('/:id')
      .get(ParticipationRouter.getParticipation)
      .delete(ParticipationRouter.deleteParticipation);

module.exports = router;