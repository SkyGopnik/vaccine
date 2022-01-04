import {
  CHANGE_REF
} from './actions';

import {UserInterface} from "src/store/user/reducers";

interface ReferHistoryInterface {
  id?: number,
  user: UserInterface,
  refId?: number,
  userId?: string
}

export interface ReferReducerInterface {
  refer?: {
    loading: boolean,
    code: number,
    stat: number,
    history: Array<ReferHistoryInterface>
  },
  getRef?()
}

const defaultState = {
  loading: true
};

export const referReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case CHANGE_REF:
    console.log(type, payload);
    return {
      ...state,
      loading: false,
      ...payload
    };

  default:
    break;
  }

  return state;
};
