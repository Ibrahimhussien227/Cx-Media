import { PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";
import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";

type InitialState = {
  value: string;
};

const initialState: InitialState = {
  value: "large",
};

export const resizeSlice = createSlice({
  name: "resize",
  initialState,
  reducers: {
    setNavSize: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setNavSize } = resizeSlice.actions;

export const selectSize = (state: RootState) => state.resize.value;

export const changeSize =
  (size: string) => (dispatch:ThunkDispatch<any, any, UnknownAsyncThunkAction>) => {
    dispatch(changeSize(size));
  };

export default resizeSlice.reducer;
