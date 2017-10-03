import models from '../models';
import notify from '../middleware/notify';

const Message = models.Message;

module.exports = {
  create(req, res) {
    /**
     *  function that creates a message object
     *  @param {req} object
     *  @param {res} object
     *  @returns undefined
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
          message
        });
      });
  }
};
