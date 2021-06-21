import lo from 'lodash';

import {
  CHANGE_PROGRESS,
  SYNC_USER,
  BALANCE_PLUS
} from './actions';
import Decimal from "decimal.js";

export interface UserInfoInterface {
  id?: string,
  firstName: string
  lastName: string
  photo: string
  sex: 0 | 1 | 2 // 0 - неопр, 1 - женский, 2 - мужской
  city?: string | null,
  userId?: string
}

export interface UserDataInterface {
  userId?: string
  balance: number
  record: number
  level: number
  passive: number
  click: number
  additional: any
  position?: number
  user?: UserInterface
}

export interface UserInterface {
  id: string
  type: string
  ref: {
    ref: string
    refCode: number
  }
  platform: string
  info: UserInfoInterface
  data: UserDataInterface
  logs: Array<{
    id: number
    type: string
    text: string
    user?: UserInterface
  }>
}

const defaultState = {
  data: null,
  clickProgress: 0
};

export const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case CHANGE_PROGRESS:
    return  {
      ...state,
      clickProgress: payload
    };

  case SYNC_USER:
    return {
      ...state,
      data: {
        ...payload
      }
    };

  case BALANCE_PLUS:
    const { balance } = state.data.data;

    return {
      ...state,
      data: lo.merge(state.data, {
        data: {
          balance: new Decimal(balance).add(payload)
        }
      })
    };

  default:
    break;
  }

  return state;
};
