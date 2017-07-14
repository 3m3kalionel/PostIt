// import group from './../models/group';
import models from './../models';

const Group = models.Group;

console.log(Group);
console.log('----------------------');

module.exports = {
  name(req, res, next) {
    Group.findOne({ where: { name: req.body.name } })
      .then((group) => {
        if (!group) {
          next();
        } else {
          res.status(400).json({
            success: false,
            message: 'Group name already exists'
          });
        }
      })
      .catch(err => res.status(400).send(err));
  }
};
