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

const Review = mongoose.model('Review' , reviewSchema);

module.exports = Review;