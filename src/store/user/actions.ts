import axios from "axios";
import lo from "lodash";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserInterface } from "src/store/user/reducers";

export const SYNC_USER = 'SYNC_USER';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';
export const BALANCE_PLUS = 'BALANCE_PLUS';

export const syncUser = (data: object) => ({
  type: SYNC_USER,
  payload: {
    ...data
  }
});

export const balancePlus = (sum: number) => ({
  type: BALANCE_PLUS,
  payload: sum
});

export const changeProgress = (progress) => ({
  type: CHANGE_PROGRESS,
  payload: progress
});

export const changeAdditional = createAsyncThunk('changeAdditional', async (arg, thunkAPI) => {
  const state = <{
    user: {
      data: UserInterface
    }
  }>thunkAPI.getState();
  const user = state.user.data;

  if (typeof arg !== "undefined") {
    await Promise.all([
      thunkAPI.dispatch(() => axios.put('/user/additional', arg)),
      thunkAPI.dispatch(syncUser({
        ...lo.merge(user, {
          data: {
            additional: lo.merge(user.data.additional, arg)
          }
        })
      }))
    ]);
  }
});
