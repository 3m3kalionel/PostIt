

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Jusibe from 'jusibe';
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

const jusibe = new Jusibe(
  process.env.SMS_PUBLIC_KEY,
  process.env.SMS_ACCESS_TOKEN
);

/**
* sends user an email, notifying him of new group messages
* @param {object} messageBody
* @param {string} messageBody.content
* @param {object} user
* @param {string} user.email
* @param {string} token
* @returns {undefined}
*/
function sendMail(messageBody, user, token) {
  const url = `${process.env.URL}/${token}`;
  // eslint-disable-next-line
  const notificationMessage = `<strong>Hello,</strong> ${user.username}. <p>Here's a new notification from PostIt... </p>
          <p>message: <b>${messageBody.content}</b></p>`;

    // eslint-disable-next-line
  const passwordresetMessage = `Hello, <strong>${user.username}. </strong> You requested a password rest.
    Click this <a href=${url}> link</a> to update your password.</p>`;

  const message = {
    to: user.email,

    subject: 'PostIt-Alert',

    text: messageBody.content,
    html: arguments.length === 2 ? notificationMessage : passwordresetMessage
  };

  winston.info('Sending Mail');
  return tp.sendMail(message, (error, info) => {
    if (error) {
      winston.error('Error occurred', error.message);
      return;
    }
    winston.info('Message sent successfully!');
    winston.info('Server responded with "%s"', info.response);
    tp.close();
  });
}

/**
* sends a user a text message, notifying him of new group messages
* @param {object} messageBody
* @param {string} messageBody.content
* @param {object} user
* @param {string} user.phone
* @returns {undefined}
*/
function sendText(messageBody, user) {
  const payload = {
    to: user.phone,
    from: 'PostIT',
    message: `Hello, ${user.username}, Here's a new notification from PostIt`
    + `message: ${messageBody.content}`
  };
  winston.info('Sending Text Message', user.phone);
  jusibe.sendSMS(payload)
    .then((res) => {
      winston.info(res.body);
    })
    .catch((err) => {
      winston.error(err.body, user.phone);
    });
}

/**
* notifies a user based on the priority type
* @param {object} messageBody
* @param {object} user
* @param {array.object} token
* @returns {undefined}
*/
const notify = (messageBody, user, token) => {
  switch (messageBody.priority) {
    case 'critical':
      return messageBody.members.forEach((member) => {
        sendMail(messageBody, member);
        sendText(messageBody, member);
        winston.info('notifying in-app users');
      });

    case 'urgent':
      return messageBody.members.forEach((member) => {
        sendMail(messageBody, member);
      });
    default:
      if (token) {
        sendMail(messageBody, user, token);
        winston.info('notifying in-app users');
      }
  }
};

export default notify;
