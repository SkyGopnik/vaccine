import {
  GET_PROFILE_STARTED,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from './actions';

import {Notification} from "src/store/notifications/reducers";
import {UserInterface} from "src/store/user/reducers";

export interface UserStat {
  level?: number,
  ratingPosition?: number,
  startAt?: Date,
  record?: number,
  savedFriends?: number,
  transfer?: number,
  improvements?: number,
  achievements?: number,
  transferSumToday?: number
}

interface RefHistoryInterface {
  id?: number,
  user: UserInterface,
  refId?: number,
  userId?: string
}

export interface ProfileData {
  id: string,
  type: string,
  stat: UserStat,
  ref: {
    refCode?: number,
    history?: Array<RefHistoryInterface>,
    ref?: number
  },
  role: string,
  additional: any,
  notification: Notification
}

export interface ProfileReducerInterface {
  data: ProfileData,
  error: any,
  loading: boolean,
  getProfile(needLoading?: boolean)
}

const defaultState = {
  loading: false,
  data: {
    stat: {},
    notification: null
  },
  error: null
};

export const profileReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_PROFILE_STARTED:
    return {
      ...state,
      loading: true
    };
  case GET_PROFILE_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      data: payload
    };
  case GET_PROFILE_FAILURE:
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
