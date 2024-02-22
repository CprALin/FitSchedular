const Participation = require('../models/ParticipationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');

exports.getAllParticipationsForAppointment = catchAsync(async (req , res , next) => {
    try{
        const getParticipations = await Participation.find({ appointmentId : req.params.appointmentId });

        res.status(200).json({
            status : 'success',
            participations : getParticipations.length,
            data : {
               getParticipations
            } 
        });
    }catch(err){
        return next(new AppError(`${err}` , 400));
    }
});

exports.createParticipation = catchAsync(async (req , res , next) => {
    try{
    
        const participation = await Participation.create({
                user : req.user._id,
                appointment : req.params.appointmentId
        });

        res.status(200).json({
            status : 'success',
            data : {
                participation    
            }
        });

    }catch(err){
        return next(new AppError(`${err}` , 400));
    }
});

exports.getParticipations = factory.getAll(Participation);
exports.getParticipation = factory.getOne(Participation);
exports.updateParticipation = factory.updateOne(Participation);
exports.deleteParticipation = factory.deleteOne(Participation);