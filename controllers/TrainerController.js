const Trainer = require('../models/TrainerModel');
const factory = require('./HandlerFactory');

const populateOption = {
     path : 'user',
     select : 'name photo'
}

exports.getTrainers = factory.getAll(Trainer);
exports.getTrainer = factory.getOne(Trainer , populateOption);
exports.updateTrainer = factory.updateOne(Trainer);
exports.deleteTrainer = factory.deleteOne(Trainer);
