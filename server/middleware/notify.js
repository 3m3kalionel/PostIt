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
  headers: {
    'X-Laziness-level': 1000
  }
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
* @returns {undefined}
*/
function sendMail(messageBody, user) {
  const message = {
    to: user.email,

    subject: 'PostIt-Alert',

    text: messageBody.content,
    // eslint-disable-next-line
    html: `<b>Hello,</b> ${user.username}. <p>Here's a new notification from PostIt... </p>
          <p>message: <b>${messageBody.content}</b></p>`,
    attachments: []
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
* @param {string} messageBody.priority
* @param {array.object} messageBody.members
* @param {object} user
* @param {string} user.phone
* @returns {undefined}
*/
export default function notify(messageBody) {
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
      return true;
  }
}
