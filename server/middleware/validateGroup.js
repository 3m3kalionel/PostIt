import models from './../models';

const Group = models.Group;
const User = models.User;

module.exports = {
  name(req, res, next) {
    Group.findOne({ where: { name: req.body.name } })
      .then((group) => {
        if (!group) {
          next();
        } else {
          res.status(400).json({
            success: false,
            message: 'Group name already exists'
          });
        }
      })
      .catch(err => res.status(400).send(err));
  },

  user(req, res, next) {
    const groupId = req.params.groupid;
    User.findOne({ where: { id: req.body.userId } })
      .then((user) => {
        if (!user) {
          return res.json({
            message: 'user does not exist'
          });
        }
        Group.findOne({ where: { id: groupId } }).then((group) => {
          group.getUsers({ where: { id: user.id } })
            .then((validUser) => {
              if (validUser.length > 0) {
                return res.status(400).json({
                  message: 'user already exists'
                });
              }
              next();
            });
        });
      })
      .catch(error => res.status(400).send(error));
  },

  validGroup(req, res, next) {
    const groupId = req.params.groupid;
    Group.findOne({ where: { id: groupId } })
      .then((group) => {
        if (!group) {
          return res.status(400).json({
            message: 'group does not exist'
          });
        }
        next();
      }).catch(error => res.send(error));
  }
};
