import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import lo from "lodash";
import {UserInterface} from "src/store/user/reducers";

export const SYNC_USER = 'SYNC_USER';

export const syncUser = (data: object) => {
  return {
    type: SYNC_USER,
    payload: {
      ...data
    }
  };
};

export const changeAdditional = createAsyncThunk('changeAdditional', (arg, thunkAPI) => {
  const state = <{
    user: {
      data: UserInterface
    }
  }>thunkAPI.getState();
  const user = state.user.data;

  if (typeof arg !== "undefined") {
    axios.put('/user/additional', arg);

    return {
      type: SYNC_USER,
      payload: {
        ...lo.merge(user, {
          data: {
            additional: lo.merge(user.data.additional, arg)
          }
        })
      }
    };
  }
});
