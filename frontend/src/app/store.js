import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import favoriteSlice from "../features/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteSlice,
  },
});
