import models from '../models';

const Group = models.Group;
const User = models.User;
const Message = models.Message;
const userGroup = models.UserGroup;

// Group.belongsToMany(User, { through: 'UserGroup' });
// User.belongsToMany(Group, { through: 'UserGroup' });

// make group name unique
// created by - group info button
// no need to search if user exists. create group. add the creator to the group.
// search the user model using decoded.email or decoded.username, on promise return 
//  add the creator - > group.addUser(decoded.)

module.exports = {
  // create(req, res) {
  //   models.User.find({ where: { email: req.body.email } }).then((user) => {
  //     Group.sync({ force: false }).then(() => {
  //       Group
  //         .create({
  //           name: req.body.name,
  //           description: req.body.description
  //         }).then((group) => {
  //           group.addUser(user)
  //             .then(() => {
  //               if (!user) {
  //                 res.send('user not found');
  //               } else { return res.status(201).send(group); }
  //             });
  //         })
  //         .catch((error) => { res.status(400).send(error); });
  //     });
  //   }).catch(error => res.send(error));

  create(req, res) {
    // var decoded = jwt.verify(token, 'shhhhh');
    // console.log(decoded.foo) // bar
    Group.sync({ force: false }).then(() => {
      return Group
        .create({
          name: req.body.name,
          description: req.body.description
        }).then((group) => {
          return User.findOne({ where: { email: req.decoded.email } }).then((user) => {
            return group.addUser(user)
              .then(() => res.status(201).json({
                message: 'Group created'
              }));
          });
        })
        .catch(error => res.status(400).send(error));
    });
  },

  list(req, res) {
    const groupId = req.params.groupid;
    return Message
      .findAll({
        where: { groupId }
      }).then(messages => res.status(200).send(messages))
      .catch(error => res.status(404).send(error));
  },
  addNewUser(req, res) {
    const userId = Number(req.body.userId);
    const groupId = req.params.groupid;
    // const adderId = Number(req.body.adderId);


    // Group.find({ where: { id: groupId } }).then((group) => { // search if the group exists
    //   group.getUsers({ where: { id: adderId } })  // check and see if the adder is a group member
    //     .then(() => {
    //       User.find({
    //         where: { id: userId } // check and see if the person is in the user model
    //       }).then((user) => {
    //         if (!user) {
    //           res.send('user not found');
    //         } else {
    //           // console.log(`group id is ${group.id}`);
    //           group.addUser(user)
    //             .then(() => res.status(200).send('new user added to group'));
    //         }
    //       }).catch(error => res.status(404).send(error));
    //     }).catch(error => res.status(404).send(error));
    // });

    Group.find({ where: { id: groupId } }).then((group) => {
      group.getUsers({ where: { email: req.decoded.email } })
        .then((adder) => {
          if (!adder) {
            return res.status(400).send('User not a group member');
          }
          User.find({
            where: { id: userId }
          }).then((user) => {
            if (!user) {
              res.send('user not found');
            } else {
              group.addUser(user)
                .then(() => res.status(200).json({
                  msg: 'new user added to group'
                }));
            }
          }).catch(error => res.status(404).send(error));
        }).catch(error => res.status(404).send(error));
    }).catch(error => res.status(404).send(error));
  }
};
