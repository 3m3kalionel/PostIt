import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const logger = createLogger();

const devConfig = () => (
  composeWithDevTools(
    applyMiddleware(thunk, reduxImmutableStateInvariant(), logger),
    autoRehydrate()
  )(createStore)(rootReducer)
);

export default devConfig;
