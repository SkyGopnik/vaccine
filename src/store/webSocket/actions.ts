import {changeView} from "src/store/app/actions";
import {syncUser} from "src/store/user/actions";

export const CONNECT_WS_STARTED = 'CONNECT_WS_STARTED';
export const CONNECT_WS_MESSAGE = 'CONNECT_WS_MESSAGE';
export const CONNECT_WS_SUCCESS = 'CONNECT_WS_SUCCESS';
export const CONNECT_WS_FAILURE = 'CONNECT_WS_FAILURE';

let socket;

export const connectWs = (socketUrl: string) => {
  return dispatch => {
    dispatch(connectWsStarted());

    socket = new WebSocket(socketUrl);
    console.log("Attempting Connection WS...");

    dispatch(changeView('loading'));

    socket.onmessage = (msg) => {
      const { type, data } = JSON.parse(msg.data);
      console.log(msg.data);

      if (type === 'SyncUser') {
        dispatch(syncUser(data));
      }

      dispatch(connectWsMessage(msg.data));
    };

    socket.onopen = () => {
      console.log("Successfully connected WS");

      dispatch(changeView('main'));

      dispatch(connectWsSuccess());

      socket.send(JSON.stringify({
        type: 'AuthUser',
        user: document.location.href
      }));
    };

    socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);

      dispatch(changeView('error'));

      dispatch(connectWsFailure(event));
    };
  }
};

export const sendWsMessage = (data: object) => {
  if (socket.readyState) {
    return () => {
      socket.send(JSON.stringify(data));
    };
  }
};

const connectWsStarted = () => ({
  type: CONNECT_WS_STARTED
});

const connectWsMessage = (message: string) => ({
  type: CONNECT_WS_MESSAGE,
  payload: JSON.parse(message)
});

const connectWsSuccess = () => ({
  type: CONNECT_WS_SUCCESS
});

const connectWsFailure = error => ({
  type: CONNECT_WS_FAILURE,
  payload: error
});
