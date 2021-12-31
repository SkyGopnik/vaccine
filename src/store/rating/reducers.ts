import {
  GET_RATING_STARTED,
  GET_RATING_SUCCESS,
  GET_RATING_FAILURE
} from './actions';

import {UserDataInterface, UserInterface} from "src/store/user/reducers";

export interface GroupInterface {
  id?: string
  info: GroupInfoInterface
  users: GroupUserInterface[]
  balance?: number
}

export interface GroupUserInterface {
  id?: number
  group: GroupInterface
  user: UserInterface
}

export interface GroupInfoInterface {
  id?: number
  name: string
  screenName: string
  type: string
  description: string
  photo: string
  group: GroupInterface
}

export interface RatingReducerInterface {
  list: {
    loading: boolean,
    data: Array<UserDataInterface> | Array<GroupInterface> | null,
    position: number,
    error: any
  },
  getRating(arg?: { loading: boolean, type: string })
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
