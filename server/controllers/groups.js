import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;
const userGroup = models.UserGroup;

module.exports = {
  create(req, res) {
    Group.sync({ force: false }).then(() => {
      return Group
        .create({
          name: req.body.name,
          description: req.body.description
        }).then((group) => {
          return User.findOne({ where: { email: req.decoded.email } }).then((user) => {
            return group.addUser(user)
              .then(() => res.status(201).json({
                message: 'Group created'
              }));
          });
        })
        .catch(error => res.status(400).send(error));
    });
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

    Group.findOne({ where: { id: groupId } }).then((group) => {
      User.findOne({
        where: { id: userId }
      }).then((user) => {
        group.addUser(user)
          .then(() => res.status(201).json({
            message: 'user added to group'
          }));
      }).catch(error => res.status(404).send(error));
    });
  }
};
