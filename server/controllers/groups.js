import models from '../models';

import paginate from '../utils/paginate';


const Group = models.Group;
const User = models.User;
const Message = models.Message;

module.exports = {
  /**
   * creates a new group
   * @param {object} req
   * @param {string} req.body.name
   * @param {string} req.body.description
   * @param {string} req.decoded.email
   * @param {object} res
   * @returns {object} created group profile
   */
  createGroup(req, res) {
    models.sequelize.sync({ force: false }).then(() => Group
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then(group => User.findOne({ where:
        { email: req.decoded.email }
      }).then(user => group.addUser(user)
        .then(() => res.status(201).json({
          message: 'Group created',
          group: {
            id: group.id,
            name: group.name,
            description: group.description,
          }
        })
        )))
    ).catch(error => res.status(500).send(error.message));
  },

  /**
  * makes a call to the lists messages posted in a group a user belongs to
  * @param {object} req
  * @param {object} res
  * @returns {array.object} a list of messages objects
  */
  listMessages(req, res) {
    const groupId = req.params.groupid;
    Message
      .findAll({
        where: { groupId },
        attributes: { exclude: ['updatedAt'] }
      }).then(messages => res.status(200).json(messages))
      .catch(error => res.status(404).send(error.message));
  },

  /**
   * searches for groups using the query passed in the request object
   * @param {object} req
   * @param {object} res
   * @returns {object} response object containing success staus and message
   */
  searchAllGroups(req, res) {
    const { name } = req.query;
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    if (isNaN(limit)) {
      return res.status(422).json({
        message: 'Please enter a VALID limit value'
      });
    } else if (isNaN(offset)) {
      return res.status(422).json({
        message: 'Please enter a VALID offset value'
      });
    }
    Group.findAndCountAll({
      where: {
        name: {
          $iLike: `%${name}%`
        },
      },
      limit,
      offset,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }).then((groups) => {
      const pagination = paginate({
        limit,
        offset,
        rowCount: groups.count,
        pageSize: groups.rows.length
      });
      return res.status(200).json({
        ...pagination,
        groups: groups.rows
      });
    }).catch(error => res.status(404).send(error.message));
  },

  /**
   * lists members of a group that a user belongs to
   * @param {object} req
   * @param {object} res
   * @returns {array.object} a list of user objects
   */
  listMembers(req, res) {
    const groupId = req.params.groupid;

    Group.findOne({ where: { id: groupId } })
      .then(group => group
        .getUsers({
          attributes: {
            exclude: [
              'password', 'salt', 'createdAt', 'updatedAt', 'UserGroups'
            ]
          }
        }).then((members) => {
          res.status(200).json(members.map(member => ({
            id: member.id,
            username: member.username,
            email: member.email,
            phone: member.phone
          })
          ));
        })).catch(error =>
        res.status(500).send(error.message));
  },

  /**
   * adds a new user to a group
   * @param {object} req
   * @param {object} res
   * @returns {array.object} a response object containing success status,
   * response message and the user's profile
   */
  addNewUser(req, res) {
    const userId = Number(req.body.userId);
    const groupId = req.params.groupid;
    Group.findOne({ where: { id: groupId } }).then((group) => {
      User.findOne({
        where: { id: userId }
      }).then((user) => {
        const { id, username, email } = user;
        group.addUser(user)
          .then(() => res.status(200).json({
            message: `${user.username} added to group`,
            user: { id, username, email }
          }));
      });
    }).catch(error => res.status(500).send(error.message));
  }
};
