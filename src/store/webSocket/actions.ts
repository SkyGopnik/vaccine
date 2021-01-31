import {changeModal, changeView} from "src/store/app/actions";
import {syncUser} from "src/store/user/actions";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const CONNECT_WS_STARTED = 'CONNECT_WS_STARTED';
export const CONNECT_WS_MESSAGE = 'CONNECT_WS_MESSAGE';
export const CONNECT_WS_SUCCESS = 'CONNECT_WS_SUCCESS';
export const CONNECT_WS_FAILURE = 'CONNECT_WS_FAILURE';

let socket;

export const connectWs = createAsyncThunk('connectWs', async (arg: string, thunkAPI) => {
  thunkAPI.dispatch(connectWsStarted());

  socket = new WebSocket(arg);
  console.log("Attempting Connection WS...");

  thunkAPI.dispatch(changeView('loading'));

  socket.onmessage = (msg) => {
    console.log('onmessage');

    const { type, subType, data } = JSON.parse(msg.data);
    console.log(msg.data);

    if (type === 'SyncUser') {
      thunkAPI.dispatch(syncUser(data));

      if (subType === 'TransferMoney') {
        const { transfer } = JSON.parse(msg.data);

        thunkAPI.dispatch(changeModal('transferGet', transfer));
      }

      if (subType === 'RefSystem') {
        const { ref } = JSON.parse(msg.data);

        thunkAPI.dispatch(changeModal('newFriend', ref));
      }
    }

    thunkAPI.dispatch(connectWsMessage(msg.data));
  };

  socket.onopen = () => {
    console.log('onopen');

    console.log("Successfully connected WS");

    // Задержка чтобы не ломать VKUI
    setTimeout(() => thunkAPI.dispatch(changeView('main')), 500);

    thunkAPI.dispatch(connectWsSuccess());

    socket.send(JSON.stringify({
      type: 'AuthUser',
      user: document.location.href
    }));
  };

  socket.onclose = event => {
    console.log('onclose');

    console.log("Socket Closed Connection: ", event);

    // Задержка чтобы не ломать VKUI
    setTimeout(() => thunkAPI.dispatch(changeView('error')), 500);

    thunkAPI.dispatch(connectWsFailure(event));
  };
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
