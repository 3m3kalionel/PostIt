import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;
const userGroup = models.UserGroup;

Group.belongsToMany(User, { through: 'UserGroup' });
User.belongsToMany(Group, { through: 'UserGroup' });

module.exports = {
  create(req, res) {
    models.User.find({ where: { email: req.body.email } }).then((user) => {
      Group.sync({ force: false }).then(() => {
        Group
          .create({
            name: req.body.name,
            description: req.body.description
          }).then((group) => {
            group.addUser(user)
              .then(() => { 
                if (!user) {
                  res.send('user not found');
                } else { return res.send('Hello'); } });
          })
          .catch((error) => { res.status(400).send(error); });
      });
    }).catch(error => res.send(error));
  },
  list(req, res) {
    const groupid = req.params.groupid;
    return Group
      .findAll({
        where: { id: groupid }
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  addNewUser(req, res) {
    const userId = req.body.userid;
    const groupId = req.params.groupid;
    const adderId = req.body.adderid;
    // User.find({
    //   where: { username }
    // }).then((user) => {
    //   Group.find({ where: { groupid } })
    //     .then((group) => {
    //       group.addUser(user);
    //     })
    //     .catch(error => res.status(404).send(error));
    // })
    //   .catch(error => res.status(404).send(error));

    Group.find({ where: { id: groupId } }).then((group) => {
       // ensure group exists
      group.getUsers({ where: { id: adderId } }) // ensures the adder exists
        .then(() => {
          console.log(userId)
          User.find({ // ensure the member to be added is a registered user using his username
            where: { id: userId }
          }).then((user) => {
            if (!user) {
              console.log(user)
              res.send('user not found');
            } else {
              group.addUser(user)
                .then(() => res.status(200).send(user));
            }
          }).catch(error => res.status(404).send(error));
        }).catch(error => res.status(404).send(error));
    });
  }
};
