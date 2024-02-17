const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true, 'Trainer must be a User !']
    },
    className : {
        type : String,
        required : [true, 'Trainer must have a class !']
    },
    classDescription : {
        type : String,
        required : [true, 'A class must have a description !']
    },
    occupation : {
        type : String,
        required : [true , 'A trainer must have an occupation !']
    },
    studies : {
        type : String,
        required : [true, 'A trainer must have some studies !']
    }
});

//populate all documents
trainerSchema.pre(/^find/ , function(next) {
    this.populate({
        path : 'user',
        select : 'name photo'
    });

    next();
});

const Trainer = mongoose.model('Trainer' , trainerSchema);

module.exports = Trainer;