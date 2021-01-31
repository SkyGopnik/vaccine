import lo from 'lodash';

import {
  SYNC_USER
} from './actions';

export interface UserInfoInterface {
  firstName: string
  lastName: string
  photo: string
  sex: 0 | 1 | 2
  city?: string | null
}

export interface UserDataInterface {
  userId?: number
  balance: number
  passive: number
  click: number
  additional: any
  position?: number
  user?: UserInterface
}

export interface UserInterface {
  id: string
  type: string
  ref: string
  platform: string
  info: UserInfoInterface
  data: UserDataInterface
}

const defaultState = {
  data: null
};

export const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SYNC_USER:
    return {
      data: {
        ...payload
      }
    };

  default:
    break;
  }

  return state;
};
