const express = require('express');
const ParticipationRouter = require('../controllers/ParticipationController');

//ROUTES
const router = express.Router();

router.route('/')
      .get(ParticipationRouter.getParticipations)
      .post(ParticipationRouter.createParticipation);

router
      .route('/:id')
      .get(ParticipationRouter.getParticipation)
      .patch(ParticipationRouter.updateParticipation)
      .delete(ParticipationRouter.deleteParticipation);

module.exports = router;