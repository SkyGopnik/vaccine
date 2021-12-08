import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import getNotifications from "src/functions/getNotifications";

export const GET_PROFILE_STARTED = 'GET_PROFILE_STARTED';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const getProfile = createAsyncThunk('getProfile', async (arg: boolean = true, thunkAPI) => {
  if (arg) {
    thunkAPI.dispatch(getProfileStarted());
  }

  try {
    const { data } = await axios.get('/v1/profile');

    const { notification } = data;

    thunkAPI.dispatch(getProfileSuccess({
      ...data,
      notification: notification ? getNotifications(notification, true) : null
    }));
  } catch (e) {
    thunkAPI.dispatch(getProfileFailure(e));
  }
});

const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  payload: data
});

const getProfileStarted = () => ({
  type: GET_PROFILE_STARTED
});

const getProfileFailure = error => ({
  type: GET_PROFILE_FAILURE,
  payload: {
    error
  }
});
