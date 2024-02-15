const Appointment = require('../models/GymAppointmentModel');
const factory = require('./HandlerFactory');

const populateOption = {
    path : 'trainer',
    select : 'className classDescription'
}

exports.getAppointments = factory.getAll(Appointment);
exports.getAppointment = factory.getOne(Appointment,populateOption);
exports.updateAppointment = factory.updateOne(Appointment);
exports.deleteAppointment = factory.deleteOne(Appointment);