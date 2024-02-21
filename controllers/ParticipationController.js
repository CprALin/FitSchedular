const Participation = require('../models/ParticipationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');

exports.createParticipation = catchAsync(async (res , req , next) => {
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