const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErr = require('./controllers/ErrorController');

const AppointmentRouter = require('./routes/AppointmentRoutes');
const ParticipationRouter = require('./routes/ParticipationRoutes');
const ReviewRouter = require('./routes/ReviewRoutes');
const TrainerRouter = require('./routes/TrainerRoutes');
const UserRouter = require('./routes/UserRoutes');

const app = express();

//SET SECURITY HTTP
app.use(helmet());

//Limit request for same API
// 100 req / h
const limiter = rateLimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'Too many requests from this IP , please try again in an hour!' 
});

// all routes starts with /api
app.use('/api' ,limiter);

//Reading data from the body into req.body
app.use(express.json({ limit : '10kb' }));

//app.use(express.urlencoded({extended : true , limit : '10kb'}));
app.use(cookieParser());

// Data sanitization against NoSql query injection
app.use(mongoSanitize());

//Data sintetization against XSS
app.use(xss());

app.use((req , res , next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies);
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/reviews' , ReviewRouter);
app.use('/api/appointments' , AppointmentRouter);
app.use('/api/participations' , ParticipationRouter);
app.use('/api/trainers' , TrainerRouter);
app.use('/api/users' , UserRouter);

app.all('*' , (req , res , next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!`,404));
});

app.use(globalErr);

module.exports = app;