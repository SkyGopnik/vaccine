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
}

export interface GroupUserInterface {
  id?: number
  group: GroupInterface
  user: UserInterface
  groupId: string
}

export interface GroupDataInterface {
  id?: number
  balance: number
  record: number
  group: GroupInterface
  groupId: string
}

export interface GroupInfoInterface {
  id?: number
  name: string
  screenName: string
  type: string
  description: string
  photo: string
  group: GroupInterface
  groupId: string
}

export interface RatingReducerInterface {
  rating: {
    loading: boolean,
    data: {
      scientists: {
        list: Array<UserDataInterface>,
        position: number
      },
      laboratories: Array<GroupDataInterface>
    },
    position: number,
    error: any
  },
  getRating?(arg?: { loading: boolean, type: string })
}

const defaultState = {
  loading: false,
  data: {},
  position: null,
  error: null
};

export const ratingReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_RATING_STARTED:
    return {
      ...state,
      loading: true
    };
  case GET_RATING_SUCCESS:
    console.log(payload);
    return {
      ...state,
      loading: false,
      error: null,
      data: {
        ...state.data,
        ...payload
      }
    };
  case GET_RATING_FAILURE:
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
