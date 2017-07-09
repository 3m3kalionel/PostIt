module.exports = {
  validUser: {
    username: 'ibrahim',
    password: '12345678',
    email: 'ibrahim@andela.com',
  },
  nullUsername: {
    password: '12345678',
    email: 'abc@andela.com'
  },
  notUniqueEmail: {
    username: 'conor',
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
