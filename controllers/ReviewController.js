const Review = require('../models/ReviewModel');
const factory = require('./HandlerFactory');

exports.setAppointmentUserIDs = (req , res , next) => {
    if(!req.body.appointment) 
    {
        req.body.appointment = req.params.appointmentId;
    }

    if(!req.body.user)
    {
        req.body.user = req.user.id;
    }

    next();
};

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);