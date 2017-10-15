import models from '../models';
import notify from '../utils/notify';

const Message = models.Message;

module.exports = {
  createMessage(req, res) {
    /**
     *  creates a message and posts it to a group depending on the priority
     * @param {object} req
     * @param {string} content
     * @param {string} priority
     * @param {number} userId
     * @param {number} groupId
     * @param {res} object
     * @returns response object containing the created message
     */
    Message
      .create({
        content: req.body.content,
        userId: req.decoded.id,
        groupId: req.params.groupid,
        priority: req.body.priority
      })
      .then((message) => {
        notify(req.body);
        res.status(201).json({
          message: {
            id: message.id,
            content: message.content,
            userId: message.userId,
            groupId: message.groupId,
            priority: message.priority,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt
          }
        });
      }).catch(error => res.status(500).send(error.message));
  }
};
