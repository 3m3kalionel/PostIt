import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

/**
 * integrates redux dev tools with the app in production environment
 * @returns {undefined}
 */
const prodConfig = () => (
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )(createStore)(rootReducer)
);

export default prodConfig;
