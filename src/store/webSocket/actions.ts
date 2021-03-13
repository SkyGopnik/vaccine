import {changeModal, changeView} from "src/store/app/actions";
import {changeProgress, syncUser} from "src/store/user/actions";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const CONNECT_WS_STARTED = 'CONNECT_WS_STARTED';
export const CONNECT_WS_MESSAGE = 'CONNECT_WS_MESSAGE';
export const CONNECT_WS_SUCCESS = 'CONNECT_WS_SUCCESS';
export const CONNECT_WS_FAILURE = 'CONNECT_WS_FAILURE';

let socket;

export const connectWs = createAsyncThunk('connectWs', async (arg: string, thunkAPI) => {
  return new Promise((resolve, reject) => {
    thunkAPI.dispatch(connectWsStarted());

    socket = new WebSocket(arg + `?user=${document.location.href}`);
    console.log("Attempting Connection WS...");

    thunkAPI.dispatch(changeView('loading'));

    socket.onmessage = async (msg) => {
      // console.log('onmessage');

      const {type, subType, data} = JSON.parse(msg.data);
      // console.log(msg.data);

      if (type === 'SyncUser') {
        thunkAPI.dispatch(syncUser(data));

        if (subType === 'TransferMoney') {
          const {transfer} = JSON.parse(msg.data);

          thunkAPI.dispatch(changeModal('transferGet', transfer));
        }

        if (subType === 'RefSystem') {
          const {ref} = JSON.parse(msg.data);

          thunkAPI.dispatch(changeModal('newFriend', ref));
        }
      }

      thunkAPI.dispatch(connectWsMessage(msg.data));
    };

    socket.onopen = () => {
      resolve(socket);

      console.log('onopen');

      console.log("Successfully connected WS");

      thunkAPI.dispatch(changeView('main'));

      thunkAPI.dispatch(connectWsSuccess());

      setInterval(() => thunkAPI.dispatch(sendWsMessage({ type: 'ping' })), 5000);
    };

    socket.onclose = event => {
      reject(event);

      console.log('onclose');

      console.log("Socket Closed Connection: ", event);

      thunkAPI.dispatch(changeProgress(0));
      thunkAPI.dispatch(changeModal(null));
      thunkAPI.dispatch(changeView('error'));

      thunkAPI.dispatch(connectWsFailure(event));
    };

    socket.onerror = error => {
      console.log("Socket Error: ", error);
    };
  });
});

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
