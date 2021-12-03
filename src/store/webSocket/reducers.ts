import {
  CONNECT_WS_STARTED,
  CONNECT_WS_SUCCESS,
  CONNECT_WS_FAILURE,
  CONNECT_WS_MESSAGE
} from './actions';

export interface WebSocketReducerInterface {
  loading?: boolean,
  data?: object | null,
  error?: any,
  connectWs?(socketUrl: string),
  sendWsMessage?(data: object)
}

const defaultState = {
  loading: false,
  data: null,
  error: null
};

export const webSocketReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CONNECT_WS_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      };
    case CONNECT_WS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: {}
      };
    case CONNECT_WS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        data: null
      };
    case CONNECT_WS_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload
      };
    default:
      break;
  }

  return state;
};
