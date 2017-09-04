const store = process.env.NODE_ENV === 'production'
  ? require('./prodConfig').default()
  : require('./devConfig').default();

export default store;
