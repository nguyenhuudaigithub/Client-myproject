import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import accountReducer from "./slice/accountSlide";
import userReducer from "./slice/userSlide";
import permissionReducer from "./slice/permissionSlide";
import roleReducer from "./slice/roleSlide";
import profileReducer from "./slice/profileSlide";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    profile: profileReducer,
    permission: permissionReducer,
    role: roleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
