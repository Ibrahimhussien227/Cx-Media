import { RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: IUserState | null;
};

const initialState : InitialState = {
  value: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<Partial<IUserState>>) => {
      state.value = {...(state.value || {}),  ...action.payload} as IUserState;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;

// selectors
export const selectCurrentUser = (state: RootState) => state.user.value;
