import lo from 'lodash';

import {
  SYNC_USER
} from './actions';

export interface UserInterface {
  id: string
  type: string
  ref: string
  platform: string
  info: {
    fistName: string
    lastName: string
    photo: string
    sex: 0 | 1 | 2
    city?: string | null
  }
  data: {
    balance: number
    passive: number
    click: number
    additional: object
  }
}

const defaultState = {
  data: null
};

export const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SYNC_USER:
    return {
      data: lo.cloneDeep(payload)
    };

  default:
    break;
  }

  return state;
};
