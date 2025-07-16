import { User } from "@/types";
import { getCookie } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  loggedIn: boolean;
  user: User | null;
  role: string | null;
}

const initialState: IAuth = {
  loggedIn: !!getCookie("_tk"),
  user: null,
  role: null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    },
    setRole: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        loggedIn: true,
        role: payload || null,
      };
    },
    logout: () => initialState,
    updateUser: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        user: {
          ...(state.user ? state.user : {}),
          ...payload,
        },
      };
    },
  },
});

export const { logout, setRole, loginSuccess, updateUser } = authSlice.actions;

export default authSlice.reducer;
