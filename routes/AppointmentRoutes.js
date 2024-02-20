const express = require('express');
const AppointmentRouter = require('../controllers/AppointmentController');
const authController = require('../controllers/AuthController');


//ROUTES
const router = express.Router();

router.get('/allAppointments' , AppointmentRouter.getAppointments);
router.route('/:id').get(AppointmentRouter.getAppointment);

router.use(authController.protect);
router.use(authController.restrictTo('admin','trainer'));

router.post('/newAppointment' , AppointmentRouter.createAppointment);

router
      .route('/:id')
      .patch(AppointmentRouter.updateAppointment)
      .delete(AppointmentRouter.deleteAppointment);

module.exports = router;