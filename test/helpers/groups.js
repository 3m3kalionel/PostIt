module.exports = {
  validMessage1: {
    content: 'Valid testing message'
  },
  validMessage2: {
    content: 'Testing another valid message'
  },
  validGroup1: {
    name: 'mma junkies',
    description: 'Only for mixed martial arts diehards!!',
  },
  validGroup2: {
    name: 'spoken word',
    description: 'all about spoken word poetry',
  },
  validGroup3: {
    name: 'the law of attraction',
    description: 'dedicated to the dreamers, believers, grinders and achievers',
  },
  emptyStringGroupName: {
    name: '',
    description: 'testing empty strings as a group name'
  },
  noDescriptionGroupName: {
    name: 'no description',
    description: ''
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
