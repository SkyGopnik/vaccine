import {ReactNode} from "react";
import {
  GET_NOTIFICATIONS_STARTED,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE
} from './actions';

import getNotifications from "src/functions/getNotifications";

import {UserInfoInterface} from "src/store/user/reducers";

export interface Notification {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  isRepeat: boolean,
  time: string,
  user?: UserInfoInterface
}

export interface NotificationsReducerInterface {
  data: Array<Notification>,
  error: any,
  loading: boolean,
  getNotifications(needLoading?: boolean)
}

const defaultState = {
  loading: false,
  data: [],
  error: null
};

export const notificationsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_NOTIFICATIONS_STARTED:
    return {
      ...state,
      loading: true
    };
  case GET_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      data: payload.map((item) => getNotifications(item))
    };
  case GET_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      loading: false,
      error: payload.error
    };

  default:
    break;
  }

  return state;
};
