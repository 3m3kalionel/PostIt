import models from './../models';

const Group = models.Group;
const User = models.User;

export default {
  /**
  * Checks if a group name already exists. Calls next if false.
  * Else, returns failure details in an object
  * @param {object} req
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @returns {object} response object containing a success status and a message
  */
  name(req, res, next) {
    Group.findOne({ where: { name: req.body.name } })
      .then((group) => {
        if (!group) {
          next();
        } else {
          res.status(409).json({
            message: 'Group name already in use'
          });
        }
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
  * Checks if any input detail is empty. Calls next if false.
  * Else, returns failure details in an object.
  * @param {object} req
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @param {string} req.body.description
  * @returns {object} response object containing a success status and a message
  */
  isEmptyContent(req, res, next) {
    const description = req.body.description;
    const name = req.body.name;
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter a group name'
      });
    } else if (!description || description.trim().length === 0) {
      return res.status(400).json({
        message: 'Please provide a description about the group'
      });
    }
    next();
  },

  /**
  * Checks if entered userId is a number or is empty.
  * Then checks if member to be added to a group exists. 
  * Then checks if he is already a group member. 
  * Calls next if false. Else, returns failure details in an object.
  * @param {object} req
  * @param {number} req.params.groupid  
  * @param {number} req.body.userId
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @returns {object} response object containing a success status and a message
  */
  user(req, res, next) {
    const groupId = req.params.groupid;
    const newMemberId = `${req.body.userId}`;
    if (newMemberId === undefined ||
    newMemberId.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter a userId'
      });
    } else if (isNaN(newMemberId)) {
      return res.status(422).json({
        message: 'Please enter a VALID userId'
      });
    }

    User.findOne({ where: { id: newMemberId } })
      .then((user) => {
        Group.findOne({ where: { id: groupId } }).then((group) => {
          if (user === null) {
            return res.status(404).json({
              message: 'user does not exist'
            });
          }
          group.getUsers({ where: { id: user.id } })
            .then((validUser) => {
              if (validUser.length > 0) {
                return res.status(409).json({
                  message: 'user already exists'
                });
              }
              next();
            });
        });
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
  * Checks if a user is a group member. Calls next if false.
  * Else, returns failure details in an object.
  * @param {object} req
  * @param {number} req.params.groupid
  * @param {number} req.decoded.id
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @returns {object} response object containing a success status and a message
  */
  isGroupMember(req, res, next) {
    Group.findOne({ where: { id: req.params.groupid } })
      .then((group) => {
        group.getUsers({ where: { id: req.decoded.id } })
          .then((user) => {
            if (user.length < 1) {
              return res.status(403).json({
                message: 'not a member of this group'
              });
            }
            return next();
          });
      }).catch(error => res.status(400).send(error.message));
  },

  /**
  * Checks if entered groupId exists. Calls next if false.
  * Else, returns failure details in an object.
  * @param {object} req
  * @param {number} req.params.groupid
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.name
  * @returns {object} response object containing a success status and a message
  */
  validGroup(req, res, next) {
    const groupId = req.params.groupid;
    if (isNaN(groupId)) {
      return res.status(422).json({
        message: 'Please enter a VALID groupId'
      });
    }
    Group.findOne({ where: { id: groupId } })
      .then((group) => {
        if (!group) {
          return res.status(404).json({
            message: 'group does not exist'
          });
        }
        next();
      }).catch(error => res.status(400).send(error.message));
  }
};
