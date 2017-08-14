import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;

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
                success: true,
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
          }).then(members => res.status(200).json(members));
      }).catch(error => res.status(404).send(error));
  },

  listGroups(req, res) {
    const userId = req.decoded.id;
    console.log(userId);
    User.findOne({ where: { id: userId } })
      .then((user) => {
        user
          .getGroups({
            where: { }
          }).then((groups) => {
            // if (groups.length === 0) {
            //   return res.status(200).json({
            //     message: 'User does not belong to any group'
            //   });
            // }
            return res.status(200).json(groups);
          })
          .catch(error => res.status(500).send(error));
      }).catch(error => res.status(500).send(error));
  },

  addNewUser(req, res) {
    const userId = Number(req.body.userId);
    const groupId = req.params.groupid;

    Group.findOne({ where: { id: groupId } }).then((group) => {
      User.findOne({
        where: { id: userId }
      }).then((user) => {
        const { id, username, email } = user;
        group.addUser(user)
          .then(() => res.status(201).json({
            success: true,
            message: `${user.username} added to group`,
            user: { id, username, email }
          }));
      });
    }).catch(error => res.status(500).send(error));
  }
};
