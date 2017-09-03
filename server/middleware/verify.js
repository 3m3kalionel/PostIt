import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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
  // const url = `http://${req.headers.host}/api/user/reset`;
  const message = {
    to: userEmail,
    subject: 'PostIt-Alert',
    html: `<b>Hello,</b> ${username}.<p>
    <p>Click this <a href=${url}> link</a> to redirect and update your password</p>`
  };

  console.log('Sending Mail'); // eslint-disable-line
  return tp.sendMail(message, (error, info) => {
    if (error) {
    console.log('Error occurred'); // eslint-disable-line
    console.log(error.message); // eslint-disable-line
      return;
    }
  console.log('Message sent successfully!'); // eslint-disable-line
  console.log('Server responded with "%s"', info.response); // eslint-disable-line
    tp.close();
  });
}

export default mailVerificationCode;
