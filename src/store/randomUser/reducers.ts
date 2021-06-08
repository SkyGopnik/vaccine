import {
  GET_RANDOM_USER_STARTED,
  GET_RANDOM_USER_SUCCESS,
  GET_RANDOM_USER_FAILURE
} from './actions';

import {UserDataInterface} from "src/store/user/reducers";
import {UserStat} from "src/store/profile/reducers";

export interface RandomUserReducerInterface {
  data: {
    id: string,
    type: string,
    stat: UserStat,
    data: UserDataInterface
  },
  error: any,
  loading: boolean,
  getRandomUser(arg: {
    loading?: boolean,
    id?: string
  })
}

const defaultState = {
  loading: false,
  data: {
    stat: {},
    data: {}
  },
  error: null
};

export const randomUserReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_RANDOM_USER_STARTED:
    return {
      ...state,
      loading: true
    };
  case GET_RANDOM_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      data: payload
    };
  case GET_RANDOM_USER_FAILURE:
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
