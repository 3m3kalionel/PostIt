import bcrypt from 'bcrypt';
import encryption from './encrypt';

module.exports = {
  validatePassword(dbPassword, reqPassword) {
    const passwordHash = encryption.encryptPassword(reqPassword);
    console.log(dbPassword);//
    console.log(passwordHash);//
    return bcrypt.compareSync(dbPassword, passwordHash);
  }
};
