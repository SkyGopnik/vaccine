import {
  GET_NOTIFICATIONS_STARTED,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE
} from './actions';

import getNotifications, {RenderNotificationInterface} from "src/functions/getNotifications";

export interface Notification extends RenderNotificationInterface {}

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
