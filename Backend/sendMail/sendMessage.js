const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SENDMAIL_HOST,
  service: process.env.SENDMAIL_SERVICE,
  port: process.env.SENDMAIL_PORT,
  secure: process.env.SENDMAIL_SECURE,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

const sendMessager = async (name , email , subject , message) => {
  const mailOptions = {
    from: {
        Email: email , 
    },
    to:  process.env.MAILER_USER,
    subject: subject,
    text: `Hey ${name} : ${message}`,
  };

  try {
     transporter.sendMail(mailOptions);
     return console.log('Email has been sent!');
  } catch (error) {
     return console.error('Error sending email:', error);
  }
};

module.exports = { sendMessager };
