import helpers from '../helpers';
import user from '../models';
import bcrypt from 'bcrypt';

const User = user.User;

module.exports = {
  create(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log('Password hash value', hash);
    console.log('Salt value', salt);
    User.sync({ force: false }).then(() => {
      User
        .create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          salt: salt
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    });
  }
};

// import helpers from '../helpers';
// import user from '../models';

// const User = user.User;

// module.exports = {
//   create(req, res) {
//     User.sync({ force: false }).then(() => {
//       User
//         .create({
//           username: req.body.username,
//           password: helpers.encrypt.encryptPassword(req.body.password).hash,
//           email: req.body.email,
//           salt: helpers.encrypt.encryptPassword(req.body.password).salt
//         })
//         .then(user => res.status(201).send(user))
//         .catch(error => res.status(400).send(error));
//     });
//   }
// };
