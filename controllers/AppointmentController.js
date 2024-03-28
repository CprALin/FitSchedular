const Appointment = require('../models/GymAppointmentModel');
const AppError = require('../utils/appError');
const Trainer = require('../models/TrainerModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');


exports.createAppointment = catchAsync(async (req , res , next) => {

    try{
      const trainer = await Trainer.findOne({ user : req.user._id});

      const newAppointment = await Appointment.create({
           trainer : trainer._id,
           onDateTime : req.body.onDateTime,
           finishHour : req.body.finishHour
      });

      res.status(200).json({
          status : 'success',
          data : {
             newAppointment
          }  
      });

    }catch(err){
       return next(new AppError(`${err}` , 400));
    }

});

exports.getAppointments = factory.getAll(Appointment);
exports.getAppointment = factory.getOne(Appointment , [{path : 'participations'} , {path : 'reviews'}]);
exports.updateAppointment = factory.updateOne(Appointment);
exports.deleteAppointment = factory.deleteOne(Appointment);