import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_RATING_STARTED = 'GET_RATING_STARTED';
export const GET_RATING_SUCCESS = 'GET_RATING_SUCCESS';
export const GET_RATING_FAILURE = 'GET_RATING_FAILURE';

export const getRating = createAsyncThunk('getRating', async (arg, thunkAPI) => {
  if (arg === undefined) {
    thunkAPI.dispatch(getRatingStarted());
  }

  try {
    const { data } = await axios.get('/rating/');

    thunkAPI.dispatch(getRatingSuccess(data));
  } catch (e) {
    thunkAPI.dispatch(getRatingFailure(e));
  }
});

const getRatingSuccess = (data) => ({
  type: GET_RATING_SUCCESS,
  payload: data
});

const getRatingStarted = () => ({
  type: GET_RATING_STARTED
});

const getRatingFailure = error => ({
  type: GET_RATING_FAILURE,
  payload: {
    error
  }
});
