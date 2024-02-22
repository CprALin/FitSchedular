const Review = require('../models/ReviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./HandlerFactory');

exports.createReview = catchAsync(async (req , res , next) => {
    try
    {
       const addReview = await Review.create({
            review : req.body.review,
            rating : req.body.rating,
            appointment : req.params.appointmentId,
            user : req.user._id
       });

       res.status(200).json({
           status : 'success',
           data : {
              addReview
           } 
       });

    }catch(err){
        return next(new AppError(`${err}` , 400));
    }
});

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);