export default {
  user: {
    token: localStorage.getItem('user_token') || null,
    userName: localStorage.getItem('user_name') || null,
    email: localStorage.getItem('user_email') || null,
    phoneNumber: localStorage.getItem('user_mobile_num') || null
  },
  userGroups: [{
    name: 'test group'
  }],
};
