const express = require('express');

const AppointmentRouter = require('./routes/AppointmentRoutes');
const ParticipationRouter = require('./routes/ParticipationRoutes');
const ReviewRouter = require('./routes/ReviewRoutes');
const TrainerRouter = require('./routes/TrainerRoutes');
const UserRouter = require('./routes/UserRoutes');

const app = express();

app.use('/api/reviews' , ReviewRouter);
app.use('/api/appointments' , AppointmentRouter);
app.use('/api/participations' , ParticipationRouter);
app.use('/api/trainers' , TrainerRouter);
app.use('/api/users' , UserRouter);

module.exports = app;