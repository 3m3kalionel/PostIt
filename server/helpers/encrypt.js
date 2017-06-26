import bcrypt from 'bcrypt';

module.exports = {
  encryptPassword(password) {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
  },

};
