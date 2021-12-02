import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GET_RANDOM_USER_STARTED = 'GET_RANDOM_USER_STARTED';
export const GET_RANDOM_USER_SUCCESS = 'GET_RANDOM_USER_SUCCESS';
export const GET_RANDOM_USER_FAILURE = 'GET_RANDOM_USER_FAILURE';

export const getRandomUser = createAsyncThunk('getRandomUser', async (arg: { loading?: boolean, id?: string } = {}, thunkAPI) => {
  const { loading, id } = {
    loading: true,
    ...arg
  };

  if (loading) {
    thunkAPI.dispatch(getRandomUserStarted());
  }

  try {
    const { data } = await axios.get("/profile/" + id);

    thunkAPI.dispatch(getRandomUserSuccess(data));
  } catch (e) {
    thunkAPI.dispatch(getRandomUserFailure(e));
  }
});

const getRandomUserSuccess = (data) => ({
  type: GET_RANDOM_USER_SUCCESS,
  payload: data
});

const getRandomUserStarted = () => ({
  type: GET_RANDOM_USER_STARTED
});

const getRandomUserFailure = error => ({
  type: GET_RANDOM_USER_FAILURE,
  payload: {
    error
  }
});
