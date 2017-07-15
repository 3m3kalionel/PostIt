import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;
const userGroup = models.UserGroup;

module.exports = {
  create(req, res) {
    models.sequelize.sync({ force: false }).then(() => {
      return Group
        .create({
          name: req.body.name,
          description: req.body.description
        }).then((group) => {
          return User.findOne({ where: { email: req.decoded.email } }).then((user) => {
            return group.addUser(user)
              .then(() => res.status(201).json({
                message: 'Group created',
                group
              }));
          });
        })
        .catch(error => res.status(400).send(error));
    });
  },

  list(req, res) {
    const groupId = req.params.groupid;
    Message
      .findAll({
        where: { groupId }
      }).then(messages => res.status(200).json(messages))
      .catch(error => res.status(404).send(error));
  },

  listMembers(req, res) {
    const groupId = req.params.groupid;

    Group.findOne({ where: { id: groupId } })
      .then((group) => {
        return group
          .getUsers({
            where: { }
          }).then(members => res.status(200).json(members))
          .catch(error => res.status(404).send(error));
      }).catch(error => res.send(error));
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
            success: true,
            message: `${user.username} added to group`
          }));
      }).catch(error => res.status(404).send(error));
    });
  }
};
