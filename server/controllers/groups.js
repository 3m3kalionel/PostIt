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
                } else { return res.status(201).send(group); }
              });
          })
          .catch((error) => { res.status(400).send(error); });
      });
    }).catch(error => res.send(error));
  },
  list(req, res) {
    const groupId = req.params.groupid;
    return Message
      .findAll({
        where: { groupId }
      }).then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  },
  addNewUser(req, res) {
    const userId = Number(req.body.userId);
    const groupId = req.params.groupid;
    const adderId = Number(req.body.adderId);


    Group.find({ where: { id: groupId } }).then((group) => {
      group.getUsers({ where: { id: adderId } })
        .then(() => {
          User.find({
            where: { id: userId }
          }).then((user) => {
            if (!user) {
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
