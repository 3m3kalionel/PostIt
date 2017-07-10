module.exports = {
  validMessage1: {
    content: 'Valid testing message'
  },
  validMessage2: {
    content: 'Testing another valid message'
  },
  profile1: {
    userId: 2,
    adderId: 1
  },

  profile2: {
    userId: 3,
    adderId: 1
  },

  errorProfile: {
    userId: 445,
    adderId: 1
  },

  validGroup1: {
    name: 'mma junkies',
    description: 'Only for mixed martial arts diehards!!',
    email: 'ibrahim@andela.com'
  },
  validGroup2: {
    name: 'spoken word',
    description: 'all about spoken word poetry',
    email: 'ibrahim@andela.com'
  },
  invalidUserGroup: {
    name: 'world class devs',
    description: 'previously unregisterd user email',
    email: 'invaliduser@andela.com'
  },
  noGroupDescription: {
    name: 'world class devs',
    email: 'nogroupdescription@andela.com'
  },
  noGroupName: {
    description: 'group name not provided',
    email: 'nogroupname@andela.com'
  },
  anonymousCreatorGroup: {
    name: 'test group',
    description: 'group creator\'s email not provided',
  }
};
