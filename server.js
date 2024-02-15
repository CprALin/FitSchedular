const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const app = require('./app');

//DB connection
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
     .then(() => {console.log('DB connection successful!')})
     .catch(err => console.error('DB connection error : ' , err));

const port = process.env.Port || 3000;
const server = app.listen(port , () => {
    console.log(`App running on port ${port}...`);
});     
