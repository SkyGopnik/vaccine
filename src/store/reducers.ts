import { combineReducers } from 'redux';
import { appReducer } from './app/reducers';
import { webSocketReducer } from './webSocket/reducers';
import { userReducer } from "./user/reducers";
import { ratingReducer } from "./rating/reducers";

export default combineReducers({
  app: appReducer,
  webSocket: webSocketReducer,
  user: userReducer,
  rating: ratingReducer
});
