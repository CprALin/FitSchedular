const Participation = require('../models/ParticipationModel');
const factory = require('./HandlerFactory');

const populateOptions = [
    { path : 'user' , select : 'name photo'},
    { path : 'appointment' , select : 'onDate startHour finishHour trainer'}
];
    

exports.getParticipations = factory.getAll(Participation);
exports.getParticipation = factory.getOne(Participation, populateOptions);
exports.createParticipation = factory.createOne(Participation);
exports.updateParticipation = factory.updateOne(Participation);
exports.deleteParticipation = factory.deleteOne(Participation);