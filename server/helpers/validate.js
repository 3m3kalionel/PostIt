import bcrypt from 'bcrypt';
import encryption from './encrypt';

module.exports = {
  validatePassword(dbPassword, reqPassword) {
    const passwordHash = encryption.encryptPassword(reqPassword);
    return bcrypt.compareSync(dbPassword, passwordHash);
  }
};
