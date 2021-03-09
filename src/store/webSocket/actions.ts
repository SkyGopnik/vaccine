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

    socket = new WebSocket(arg);
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

      // if (type === 'AuthSuccess') {
      //   const ref = hashGet('ref');
      //
      //   if (ref) {
      //     thunkAPI.dispatch(sendWsMessage({
      //       type: 'SaveRef',
      //       refId: ref
      //     }));
      //
      //     window.location.hash = '';
      //   }
      // }

      // if (type === 'RefUser') {
      //   const { refId, currentId } = JSON.parse(msg.data);
      //
      //   if (refId) {
      //     try {
      //       const { data } = await axios.get(`/user/ref?refId=${refId}`);
      //
      //       const refUser = lo.find(data, {
      //         userId: refId
      //       });
      //
      //       const currentUser = lo.find(data, {
      //         userId: currentId
      //       });
      //
      //       // Обновляем баланс пользователю который привёл реферала
      //       thunkAPI.dispatch(sendWsMessage({
      //         type: 'RefSystem',
      //         refId: refId,
      //         sum: refUser.click * 500
      //       }));
      //
      //       // Модалка с тем что ты получил денег за то что зашёл по рефералке
      //       thunkAPI.dispatch(changeModal('refMoney', {
      //         data: refUser,
      //         sum: currentUser.click * 1000
      //       }));
      //
      //       // Обновляем себе
      //       thunkAPI.dispatch(sendWsMessage({
      //         type: 'SyncUser'
      //       }));
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }
      // }

      thunkAPI.dispatch(connectWsMessage(msg.data));
    };

    socket.onopen = () => {
      resolve(socket);

      console.log('onopen');

      console.log("Successfully connected WS");

      socket.send(JSON.stringify({
        type: 'AuthUser',
        user: document.location.href
      }));

      // thunkAPI.dispatch(changeView('main'));

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
