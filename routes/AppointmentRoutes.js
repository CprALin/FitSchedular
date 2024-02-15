const express = require('express');
const AppointmentRouter = require('../controllers/AppointmentController');

//ROUTES
const router = express.Router();

router.route('/')
      .get(AppointmentRouter.getAppointments)
      .post(AppointmentRouter.createAppointment);

router
      .route('/:id')
      .get(AppointmentRouter.getAppointment)
      .patch(AppointmentRouter.updateAppointment)
      .delete(AppointmentRouter.deleteAppointment);

module.exports = router;