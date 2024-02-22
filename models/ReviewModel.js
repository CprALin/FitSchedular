const mongoose = require('mongoose');
const Appointment = require('../models/GymAppointmentModel');

const reviewSchema = new mongoose.Schema({
    review : {
        type : String,
        required : [true, 'Review can not be empty !']
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    appointment : {
        type : mongoose.Schema.ObjectId,
        ref : 'Appointment',
        required : [true, 'Review must belong to an appointment !']
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true, 'Review must belong to a user !']
    }
},{
    toJSON : {virtuals : true},
    toObject : { virtuals : true }
});

reviewSchema.index({appointment : 1 , user : 1} , {unique : true});

reviewSchema.pre(/^find/ , function(next) {
    this.populate({
        path : 'user',
        select : 'name photo'
    });
 
    next();
});

reviewSchema.statics.calcAverageRatings = async function(appointmentId) {
    const stats = await this.aggregate([
        {
            $match : { appointment : appointmentId }
        },
        {
            $group : {
                _id : '$appointment',
                nRatings : { $sum : 1 },
                avgRating : { $avg : '$rating' }
            }
        }
    ]);

    if(stats.length > 0){
        await Appointment.findByIdAndUpdate(appointmentId , {
            ratingsQuantity : stats[0].nRatings,
            ratingsAvarage : stats[0].avgRating
        });
    }else{
        await Appointment.findByIdAndUpdate(appointmentId , {
            ratingsQuantity : 0,
            ratingsAvarage : 4.5
        });
    }
};

reviewSchema.post('save' , function() {
    this.constructor.calcAverageRatings(this.appointment);
});

reviewSchema.pre(/^findOneAnd/ , async function(next){
    this.rate = await this.findOne();

    next();
});

reviewSchema.post(/^findOneAnd/ , async function(){
    await this.rate.constructor.calcAverageRatings(this.rate.appointment);
});

const Review = mongoose.model('Review' , reviewSchema);

module.exports = Review;