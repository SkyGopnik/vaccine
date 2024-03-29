import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_RATING_STARTED = 'GET_RATING_STARTED';
export const GET_RATING_SUCCESS = 'GET_RATING_SUCCESS';
export const GET_RATING_FAILURE = 'GET_RATING_FAILURE';

export const getRating = createAsyncThunk('getRating', async (arg: { loading: boolean, type: string }, thunkAPI) => {
  const _arg = {
    loading: false,
    type: 'scientists',
    ...arg
  };

  if (_arg.loading) {
    thunkAPI.dispatch(getRatingStarted());
  }

  try {
    const { data } = await axios.get('/v1/rating?type=' + _arg.type);

    thunkAPI.dispatch(getRatingSuccess({
      [_arg.type]: data
    }));
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
