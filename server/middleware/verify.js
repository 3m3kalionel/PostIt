import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();


const tp = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  debug: false
}, {
  from: 'Post-IT <no-reply@pangalink.net>',
});


function mailVerificationCode(username, userEmail, token) {
  const url = `${process.env.URL}/${token}`;
  const message = {
    to: userEmail,
    subject: 'PostIt-Alert',
    html: `<b>Hello,</b> ${username}.<p>
    <p>Click this <a href=${url}> link</a> to redirect and update your password</p>`
  };

  winston.log('Sending Mail');
  return tp.sendMail(message, (error, info) => {
    if (error) {
      winston.log('Error occurred');
      winston.log(error.message);
      return;
    }
    winston.log('Message sent successfully!');
    winston.log('Server responded with "%s"', info.response);
    tp.close();
  });
}

export default mailVerificationCode;
