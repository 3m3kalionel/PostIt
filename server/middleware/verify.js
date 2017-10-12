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

/**
* sends a user an email
* @param {object} username
* @param {string} userEmail
* @param {object} token
* @returns {undefined}
*/
function mailResetLink(username, userEmail, token) {
  const url = `${process.env.URL}/${token}`;
  const message = {
    to: userEmail,
    subject: 'PostIt-Alert',
    html: `<b>Hello,</b> ${username}.<p>
    <p>Click this <a href=${url}> link</a> to redirect and update your password</p>` // eslint-disable-line
  };

  winston.info('Sending Mail');
  return tp.sendMail(message, (error, info) => {
    if (error) {
      winston.error('Error occurred');
      winston.error(error.message);
      return;
    }
    winston.info('Message sent successfully!');
    winston.info('Server responded with "%s"', info.response);
    tp.close();
  });
}

export default mailResetLink;
