import models from '../models';

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
          message
        });
      });
  }
};
