import {combineReducers, createStore, Store} from 'redux';
import {reducer} from './reducer';

const rootReducer = combineReducers({
  reducer,
});

const store: Store = createStore(rootReducer);

export default store;
