import bcrypt from 'bcrypt';

module.exports = {
  encryptPassword(password) {
    // const passwordHash = bcrypt.hashSync(password, 10);
    // return passwordHash;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return {
      hash,
      salt
    };
  },

};
