export const user = {
  id: 24,
  username: 'whitebeltdev',
  email: 'emeka@andela.com',
  phone: 12345678
};

export const group = {
  id: 23,
  name: 'hip hop heads',
  description: 'lyrical hip hop dudes',
};

export const list = [{
  id: 23,
  name: 'hip hop heads',
  description: 'lyrical hip hop dudes',
},
{
  id: 23,
  name: 'hip hop heads',
  description: 'lyrical hip hop dudes',
}];

export const message = {
  id: 58,
  content: 'see world',
  userId: 1,
  groupId: 14,
  priority: 'normal'
};

export const groups = {
  groupWithMembers: {
    id: 1,
    members: [
      {
        user: {
          id: 24,
          username: 'whitebeltdev',
          email: 'emeka@andela.com',
          phone: 12345678
        }
      }
    ],
    messages: []
  },
  emptyGroup: {
    id: 14,
    members: [],
    messages: []
  },
  groupWithMessage: {
    id: 2,
    messages: [
      {
        id: 58,
        content: 'see world',
        userId: 1,
        groupId: 14,
        priority: 'normal'
      }
    ]
  },
  sampleGroup: {
    id: 4,
    name: 'Sample',
    description: 'Believers in the law of atttraction',
  }
};

export const users = {
  validUserEmeka: {
    id: 11,
    username: 'emeka',
    email: 'whitebeltdev@gmail.com',
    phone: '00000000001',
  },
  authenticatedUserLionel: {
    isAuthenticated: true,
    user: {
      id: 12,
      username: 'Lionel',
      emai: 'whitebeltdev@gmail.com',
      phone: '003000001'
    },
  }
};
