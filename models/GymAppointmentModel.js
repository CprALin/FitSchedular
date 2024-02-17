const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
     trainer : {
        type : mongoose.Schema.ObjectId,
        ref : 'Trainer',
        required : [true, 'An appointment must belog to a trainer !']
     },
     onDate : {
        type : Date,
        required : [true, 'An appointment must have a date !']
     },
     startHour : {
        type : Number,
        require : [true, 'An appointment must have a start hour !']
     },
     finishHour : {
        type : Number,
        require : [true, 'An appointment must have a finish hour !']
     },
     participations : {
        type : mongoose.Schema.ObjectId,
        ref : 'Participation'
     }
});

const Appointment = mongoose.model('Appointment' , appointmentSchema);

module.exports = Appointment;