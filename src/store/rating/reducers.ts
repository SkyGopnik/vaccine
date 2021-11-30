import {
  GET_RATING_STARTED,
  GET_RATING_SUCCESS,
  GET_RATING_FAILURE
} from './actions';

import {UserDataInterface} from "src/store/user/reducers";

export interface RatingReducerInterface {
  list: {
    loading: boolean,
    data: Array<UserDataInterface> | null,
    position: number,
    error: any
  },
  getRating(needLoading?: boolean)
}

const defaultState = {
  list: {
    loading: false,
    data: null,
    position: null,
    error: null
  }
};

export const ratingReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_RATING_STARTED:
    return {
      ...state,
      list: {
        ...state.list,
        loading: true
      }
    };
  case GET_RATING_SUCCESS:
    return {
      ...state,
      list: {
        loading: false,
        error: null,
        data: payload.list,
        position: payload.position
      }
    };
  case GET_RATING_FAILURE:
    return {
      ...state,
      list: {
        ...state.list,
        loading: false,
        error: payload.error
      }
    };

  default:
    break;
  }

  return state;
};
