const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async options => {
    
    //create a transporter
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        //service : 'Gmail' ,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    });

    //define the email options
    const mailOptions = {
        from : 'Cpr Alin <test@yahoo.com>',
        to : options.email,
        subject : options.subject,
        text : options.message,
    }


    await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;