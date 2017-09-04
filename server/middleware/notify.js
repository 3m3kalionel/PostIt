import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Jusibe from 'jusibe';

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

function sendMail(messageBody, user) {
  const message = {
    to: user.email,

    subject: 'PostIt-Alert',

    text: messageBody.content,

    html: `<b>Hello,</b> ${user.username}. <p>Here's a new notification from PostIt... </p>
          <p>message: <b>${messageBody.content}</b></p><p>from: <b>${messageBody.content}</b></p>`,

    attachments: []
  };

  console.log('Sending Mail'); // eslint-disable-line
  return tp.sendMail(message, (error, info) => {
    if (error) {
    console.log('Error occurred', error.message); // eslint-disable-line
      return;
    }
  console.log('Message sent successfully!'); // eslint-disable-line
  console.log('Server responded with "%s"', info.response); // eslint-disable-line
    tp.close();
  });
}

function sendText(messageBody, user) {
  const payload = {
    to: user.phone,
    from: 'PostIT',
    message: 'Hello, ' + user.username + ', Here\'s a new notification from PostIt... ' +  'message: ' + messageBody.content + ' from: ' + messageBody.content + ' 😎',
  };
  console.log('Sending Text Message', user.phone); // eslint-disable-line
  jusibe.sendSMS(payload)
    .then((res) => {
      console.log(res.body); // eslint-disable-line
    })
    .catch((err) => {
      console.log(err.body, user.phone); // eslint-disable-line
    });
}

function notifyInApp() {

};

export default function notify(messageBody) {
  console.log('messageBody', messageBody);
  switch (messageBody.priority) {
    case 'critical':
      return messageBody.members.forEach((member) => {
        sendMail(messageBody, member);
        sendText(messageBody, member);
        console.log('notifying in-app users');
      });
    // case 'normal':
    //   return messageBody.members.forEach((member) => {
    //     return sendMail(messageBody, member);
    //   });
    case 'urgent':
      return messageBody.members.forEach((member) => {
        sendMail(messageBody, member);
      });
    default:
      return true;
  }
}
