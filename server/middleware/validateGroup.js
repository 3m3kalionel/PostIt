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
            errorMessage: 'Group name already exists'
          });
        }
      })
      .catch(err => res.status(500).send(err));
  },

  isEmptyContent(req, res, next) {
    const description = req.body.description;
    const name = req.body.name;
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Please enter a group name'
      });
    } else if (!description || description.trim().length === 0) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Please provide a description about the group'
      });
    }
    next();
  },

  user(req, res, next) {
    const groupId = req.params.groupid;
    User.findOne({ where: { id: req.body.userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'user does not exist'
          });
        }
        Group.findOne({ where: { id: groupId } }).then((group) => {
          group.getUsers({ where: { id: user.id } })
            .then((validUser) => {
              if (validUser.length > 0) {
                return res.status(400).json({
                  success: false,
                  message: 'user already exists'
                });
              }
              next();
            });
        });
      })
      .catch(error => res.status(500).send(error));
  },

  isGroupMember(req, res, next) {
    Group.findOne({ where: { id: req.params.groupid } })
      .then((group) => {
        group.getUsers({ where: { id: req.decoded.id } })
          .then((user) => {
            if (user.length < 1) {
              return res.status(400).json({
                success: false,
                errorMessage: 'not a member of this group'
              });
            }
            return next();
          });
      });
  },

  validGroup(req, res, next) {
    const groupId = req.params.groupid;
    Group.findOne({ where: { id: groupId } })
      .then((group) => {
        if (!group) {
          return res.status(404).json({
            errorMessage: 'group does not exist'
          });
        }
        next();
      }).catch(error => res.status(500).send(error));
  }
};
