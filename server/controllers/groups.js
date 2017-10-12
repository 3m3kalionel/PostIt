import models from '../models';

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
  create(req, res) {
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
  list(req, res) {
    const groupId = req.params.groupid;
    Message
      .findAll({
        where: { groupId },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }).then(messages => res.status(200).json(messages))
      .catch(error => res.status(404).send(error.message));
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
   * lists groups that a user belongs to
   * @param {object} req
   * @param {object} res
   * @returns {array.object} a list of group objects
   */
  listGroups(req, res) {
    const userId = req.decoded.id;
    User.findOne({ where: { id: userId } })
      .then((user) => {
        user
          .getGroups({
            where: { },
            attributes: {
              exclude: ['description', 'createdAt',
                'updatedAt']
            }
          }).then(groups => res.status(200).json(groups.map(group => ({
            name: group.name,
            id: group.id
          }))
          ));
      }).catch(error => res.status(500).send(error.message));
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
    }).catch(error => res.status(500).send(error));
  }
};
