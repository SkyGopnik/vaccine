import { combineReducers } from 'redux';
import { appReducer } from './app/reducers';

export default combineReducers({
  app: appReducer
});
