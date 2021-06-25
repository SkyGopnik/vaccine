import {changeModal, changeSnackbar, changeView} from "src/store/app/actions";
import {changeProgress, syncUser, balancePlus} from "src/store/user/actions";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {passiveOfflineBonus, transferGet, newFriend} from "src/functions/getSnackbar";
import {AppReducerInterface} from "src/store/app/reducers";
export const CONNECT_WS_STARTED = 'CONNECT_WS_STARTED';
export const CONNECT_WS_MESSAGE = 'CONNECT_WS_MESSAGE';
export const CONNECT_WS_SUCCESS = 'CONNECT_WS_SUCCESS';
export const CONNECT_WS_FAILURE = 'CONNECT_WS_FAILURE';

let socket;
let ping; // interval для поддержки общения с сервером
let error; // interval для вызова ошибки если она не смогла открыться

export const connectWs = createAsyncThunk('connectWs', async (arg: string, thunkAPI) => {
  return new Promise((resolve, reject) => {
    thunkAPI.dispatch(connectWsStarted());

    try {
      socket.close();
    } catch (e) {
      console.log('test');
    }

    socket = new WebSocket(arg + `?user=${document.location.href}`);
    console.log("Attempting Connection WS...");

    clearInterval(error);
    clearInterval(ping);

    thunkAPI.dispatch(changeView('loading'));

    socket.onmessage = async (msg) => {
      const {type, subType, data} = JSON.parse(msg.data);

      if (type === 'PassiveOfflineBonus') {
        const { bonus } = JSON.parse(msg.data);

        thunkAPI.dispatch(changeSnackbar(passiveOfflineBonus(bonus)));
        thunkAPI.dispatch(balancePlus(bonus));
      }

      if (type === 'SyncUser') {
        thunkAPI.dispatch(syncUser(data));

        if (subType === 'TransferMoney') {
          const {transfer} = JSON.parse(msg.data);

          thunkAPI.dispatch(changeSnackbar(transferGet(transfer)));
        }

        if (subType === 'RefSystem') {
          const {ref} = JSON.parse(msg.data);

          thunkAPI.dispatch(changeSnackbar(newFriend(ref)));
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

      ping = setInterval(() => {
        thunkAPI.dispatch(sendWsMessage({ type: 'ping' }));
        thunkAPI.dispatch(sendWsMessage({ type: 'SyncUser' }));
      }, 5000);
    };

    socket.onclose = event => {
      reject(event);

      console.log("Socket Closed Connection: ", event);

      error = setInterval(() => {
        const { app } = <{
          app: AppReducerInterface
        }>thunkAPI.getState();

        if (app.view !== 'error') {
          thunkAPI.dispatch(changeView('error'));
        }
      }, 1000);

      clearInterval(ping);

      thunkAPI.dispatch(changeProgress(0));
      thunkAPI.dispatch(changeModal(null));

      thunkAPI.dispatch(connectWsFailure(event));
    };

    socket.onerror = error => {
      console.log("Socket Error: ", error);
    };
  });
});

export const sendWsMessage = (data: object) => {
  if (socket.readyState === 1) {
    let binaryData = new TextEncoder().encode(JSON.stringify(data))
   // alert(JSON.stringify(data))
    return () => socket.send(binaryData);
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
