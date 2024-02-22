const express = require('express');
const AppointmentRouter = require('../controllers/AppointmentController');
const authController = require('../controllers/AuthController');
const ParticipationRouter = require('../controllers/ParticipationController');
const ReviewRouter = require('../controllers/ReviewController');


//ROUTES
const router = express.Router();

router.get('/allAppointments' , AppointmentRouter.getAppointments);
router.route('/:id').get(AppointmentRouter.getAppointment);

router.use(authController.protect);
router.use(authController.restrictTo('trainer'));

router.post('/newAppointment' , AppointmentRouter.createAppointment);

router
      .route('/:id')
      .patch(AppointmentRouter.updateAppointment)
      .delete(AppointmentRouter.deleteAppointment);

router.post('/:appointmentId/addParticipation', ParticipationRouter.createParticipation);    
router.post('/:appointmentId/addReview' , ReviewRouter.createReview);  

module.exports = router;