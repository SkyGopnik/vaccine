import { combineReducers } from 'redux';

import { appReducer } from './app/reducers';
import { webSocketReducer } from './webSocket/reducers';
import { userReducer } from "./user/reducers";
import { ratingReducer } from "./rating/reducers";
import { notificationsReducer } from "./notifications/reducers";
import { profileReducer } from "src/store/profile/reducers";
import { randomUserReducer } from "src/store/randomUser/reducers";

export default combineReducers({
  app: appReducer,
  webSocket: webSocketReducer,
  user: userReducer,
  rating: ratingReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  randomUser: randomUserReducer
});
