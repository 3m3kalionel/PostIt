import models from '../models';
import notify from '../middleware/notify';

const Message = models.Message;

module.exports = {
  create(req, res) {
    console.log('hjhjhjhjhjhj++++++=====>>>>', req.body);
    Message
      .create({
        content: req.body.content,
        userId: req.decoded.id,
        groupId: req.params.groupid,
      })
      .then((message) => {
        notify(req.body);
        res.status(201).json({
          message
        });
      });
  }
};
