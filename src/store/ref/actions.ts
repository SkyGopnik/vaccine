import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const CHANGE_REF = 'CHANGE_REF';

export const getRef = createAsyncThunk('getRef', async (arg, thunkAPI) => {
  const { data } = await axios.get('/v1/ref');

  thunkAPI.dispatch(changeRef(data));
});

const changeRef = (data) => ({
  type: CHANGE_REF,
  payload: data
});
