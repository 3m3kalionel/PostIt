// import { persistStore } from 'redux-persist';
// import localForage from 'localforage';

const store = process.env.NODE_ENV === 'production'
  ? require('./prodConfig').default()
  : require('./devConfig').default();

// persistStore(store, { storage: localForage });

export default store;
