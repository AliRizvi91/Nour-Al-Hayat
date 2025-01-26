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

const sendmailer = async (email, otp) => {
  const mailOptions = {
    from: {
      name: 'ARZ',
      address: process.env.MAILER_USER,
    },
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <h1>${otp}</h1></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendmailer };
