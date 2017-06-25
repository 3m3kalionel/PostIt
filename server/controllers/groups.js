import models from '../models';

const Group = models.Group;
const User = models.User;

Group.belongsToMany(User, { through: 'userGroup' });
User.belongsToMany(Group, { through: 'userGroup' });

module.exports = {
  create(req, res) {
    Group.sync({ force: false }).then(() => {
      Group
        .create({
          name: req.body.name,
          description: req.body.description,
        })
        .then(groups => res.status(201).send(groups))
        .catch(error => res.status(400).send(error));
    });
  }
};
