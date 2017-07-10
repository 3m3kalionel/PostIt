import models from '../models';

const Message = models.Message;

module.exports = {
  create(req, res) {
    Message.sync({ force: false }).then(() => {
      Message
        .create({
          content: req.body.content,
          userId: 1,
          groupId: req.params.groupid,
        })
        .then(text => res.status(201).send(text))
        .catch((error) => {
          res.status(400).send(error);
        })
    });
  }
};
