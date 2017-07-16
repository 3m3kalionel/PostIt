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
  validUser10: {
    username: 'victor',
    password: '12345678',
    email: 'victor@andela.com',
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
  emptyStringUsername: {
    username: '',
    password: '12345678',
    email: 'hello@andela.com'

  },
  invalidUser: {
    username: 'invalid',
    password: '12345678'
  },
  emptyStringEmailUser: {
    username: 'invalid',
    password: '12345678',
    email: ''
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
  lessPasswordCharUser: {
    username: 'userLessPassword',
    password: '1234',
    email: 'userLessPassword@andela.com',
  },
  poorFormatEmailUser: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy'
  },
  poorFormatEmailUser2: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy@andela'
  },
  poorFormatEmailUser3: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy.andela.com'
  }
};
