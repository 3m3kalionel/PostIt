module.exports = {
  validUser1: {
    username: 'ibrahim',
    password: '12345678',
    email: 'ibrahim@andela.com',
    phone: '08030561550'
  },
  validUser2: {
    username: 'conor',
    password: '12345678',
    email: 'conor@andela.com',
    phone: '08030561551'
  },
  validUser10: {
    username: 'victor',
    password: '12345678',
    email: 'victor@andela.com',
    phone: '08030561552'
  },
  existingUsername: {
    username: 'ibrahim',
    password: '12345678',
    email: 'existingUsername@andela.com',
    phone: '887730375'
  },
  validUser3: {
    username: 'jon',
    password: '12345678',
    email: 'jon@andela.com',
    phone: '08030561553'
  },
  rightUsernameWrongPassword: {
    username: 'ibrahim',
    password: '12345678889',
    phone: '08030561554',
  },
  wrongUsername: {
    username: 'lol',
    password: 'e99ehkhee',
    phone: '08030561555'
  },
  emptyStringUsername: {
    username: '',
    password: '12345678',
    email: 'hello@andela.com',
    phone: '08030561556'

  },
  invalidUser: {
    username: 'invalid',
    password: '12345678',
    phone: '08030561557'
  },
  emptyStringEmailUser: {
    username: 'invalid',
    password: '12345678',
    email: '',
    phone: '08030561558'
  },

  noUsername: {
    password: '12345678',
    email: 'abc@andela.com',
    phone: '08030561559'
  },
  notUniqueEmail: {
    username: 'oladi',
    password: '12345678',
    email: 'ibrahim@andela.com',
    phone: '08030561560'
  },
  nullEmail: {
    username: 'jonjones',
    password: '12345678',
    phone: '08030561561'
  },
  lessPasswordCharUser: {
    username: 'userLessPassword',
    password: '1234',
    email: 'userLessPassword@andela.com',
    phone: '08030561562'
  },
  morePasswordCharUser: {
    username: 'userLessPassword',
    password: '123451234512345123452',
    email: 'userLessPassword@andela.com',
    phone: '08030561563'
  },
  poorFormatEmailUser: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy',
    phone: '08030561564'
  },
  poorFormatEmailUser2: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy@andela',
    phone: '08030561565'
  },
  poorFormatEmailUser3: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy.andela.com',
    phone: '08030561566'
  },
  noPhoneNumber: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy.andela.com',
    phone: ''
  },
  emptyStringPhoneNumber: {
    username: 'dummy',
    password: '12345678',
    email: 'dummy.andela.com',
    phone: ''
  }
};
