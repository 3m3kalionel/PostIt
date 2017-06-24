import bcrypt from 'bcrypt';
import encryption from './encrypt';

module.exports = {
  validatePassword(password) {
    const passwordHash = encryption.encryptPassword(password);
    return bcrypt.compareSync(password, passwordHash);
  }
};
