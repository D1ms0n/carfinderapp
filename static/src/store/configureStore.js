
import {createStore} from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState
  )
}

// import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
// import rootReducer from '../reducers/index';
//
// export default function configureStore(initialState) {
//   const logger = createLogger();
//   return createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(logger));
// }