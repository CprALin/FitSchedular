const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true, 'An participation must have a user !']
    },
    appointment : {
        type : mongoose.Schema.ObjectId,
        ref : 'Appointment',
        required : [true, 'An participation must have an appointment !']
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

//populate all documents
participationSchema.pre(/^find/ , function(next) {
    this.populate({
        path : 'user',
        select : 'name photo'
    });
 
    next();
});

//populate all documents
participationSchema.pre(/^find/ , function(next) {
    this.populate({
        path : 'appointment',
        select : 'trainer onDate startHour finishHour'
    });
 
    next();
});



const Participation = mongoose.model('Participation' , participationSchema);

module.exports = Participation;