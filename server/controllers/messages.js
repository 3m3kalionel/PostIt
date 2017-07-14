import models from '../models';

const Group = models.group;
const Message = models.Message;

module.exports = {
  create(req, res) {
    Message
      .create({
        content: req.body.content,
        userId: req.decoded.id,
        groupId: req.params.groupid,
      })
      .then((message) => {
        res.status(201).json({
          success: 'true',
          message
        });
      });
  }
};
