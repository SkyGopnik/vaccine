import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_NOTIFICATIONS_STARTED = 'GET_NOTIFICATIONS_STARTED';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';

export const getNotifications = createAsyncThunk('getNotifications', async (arg: boolean = true, thunkAPI) => {
  if (arg) {
    thunkAPI.dispatch(getNotificationsStarted());
  }

  try {
    const { data } = await axios.get('/user/notifications');

    thunkAPI.dispatch(getNotificationsSuccess(data));
  } catch (e) {
    thunkAPI.dispatch(getNotificationsFailure(e));
  }
});

const getNotificationsSuccess = (data) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: data
});

const getNotificationsStarted = () => ({
  type: GET_NOTIFICATIONS_STARTED
});

const getNotificationsFailure = error => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: {
    error
  }
});
