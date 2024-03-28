const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
     trainer : {
        type : mongoose.Schema.ObjectId,
        ref : 'Trainer',
        required : [true, 'An appointment must belog to a trainer !']
     },
     onDateTime : {
        type : Date,
        required : [true, 'An appointment must have a date and time !']
     },
     finishHour : {
        type : Date,
        require : [true, 'An appointment must have a finish hour !']
     }
}, {
   toJSON : { virtuals : true },
   toObject : { virtuals : true }
});

appointmentSchema.path('onDateTime').validate({
   validator: async function() {

       const existingAppointments = await this.constructor.find({
           onDateTime: { $lt: this.finishHour }, 
           finishHour: { $gt: this.onDateTime } 
       });

      
       return !(existingAppointments.length > 0);
   },
   message: 'Another appointment exists in this time interval'
});

appointmentSchema.index({ onDateTime: 1 }, { unique: true });

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