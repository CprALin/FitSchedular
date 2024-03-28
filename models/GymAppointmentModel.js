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
     duration : {
        type : Number,
        require : [true, 'An appointment must have a duration !']
     },
     images : [String],
     slug : String
}, {
   toJSON : { virtuals : true },
   toObject : { virtuals : true }
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
       select : 'className user',
       populate : {
           path : 'user',
           select : 'name'
       }
   });

   next();
});


const Appointment = mongoose.model('Appointment' , appointmentSchema);

module.exports = Appointment;