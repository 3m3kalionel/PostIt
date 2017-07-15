module.exports = {
  validUser1: {
    username: 'ibrahim',
    password: '12345678',
    email: 'ibrahim@andela.com',
  },
  validUser2: {
    username: 'conor',
    password: '12345678',
    email: 'conor@andela.com',
  },
  validUser3: {
    username: 'jon',
    password: '12345678',
    email: 'jon@andela.com',
  },
  rightUsernameWrongPassword: {
    username: 'ibrahim',
    password: '12345678889'
  },
  wrongUsername: {
    username: 'lol',
    password: 'e99ehkhee'
  },
  invalidUser: {
    username: 'invalid',
    password: '12345678'
  },
  nullUsername: {
    password: '12345678',
    email: 'abc@andela.com'
  },
  notUniqueEmail: {
    username: 'oladi',
    password: '12345678',
    email: 'ibrahim@andela.com',
  },
  nullEmail: {
    username: 'jonjones',
    password: '12345678'
  },
  lessPasswordChar: {
    username: 'userLessPassword',
    password: '1234',
    email: 'userLessPassword@andela.com',
  }
};
