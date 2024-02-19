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
     images : [String],
     slug : String
}, {
   toJSON : { virtuals : true },
   toObject : { virtuals : true }
});

appointmentSchema.index({slug : 1});

appointmentSchema.virtual('reviews' , {
      ref : 'Review',
      foreignField : 'appointment',
      localField : '_id'
});

appointmentSchema.virtual('participations' , {
      ref : 'Participation',
      foreignField : 'appointment',
      localField : '_id'
});

//populate all documents
appointmentSchema.pre(/^find/ , function(next) {
   this.populate({
       path : 'trainer',
       select : 'className classDescription'
   });

   next();
});

const Appointment = mongoose.model('Appointment' , appointmentSchema);

module.exports = Appointment;