const mongoose = require('mongoose');

const participationSchema = mongoose.Schema({
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

const Participation = mongoose.model('Participation' , participationSchema);

module.exports = Participation;