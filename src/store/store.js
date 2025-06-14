import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

//This store is just for keeping track of the authentication state of the user.
// It is not used for any other state management in the application.
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
