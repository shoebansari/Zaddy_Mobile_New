import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequestWithToken } from '../../api/auth';

// Thunk to handle login
export const onLogin = createAsyncThunk("signIn/onLogin", async (body) => {
  const res = await postRequestWithToken("/Authentication/appLogin", body);
  if (res.statusCode === 200) {
    await AsyncStorage.setItem('loginDetails', JSON.stringify(res.data));
    await AsyncStorage.setItem('token', (res.token));
  }
  return {
    isAuthenticated: res.statusCode === 200,
    data: res.data,
    token: res.token,
  };
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoader: false,
  isError: false,
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('loginDetails');
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.pending, (state) => {
        state.isLoader = true;
        state.isError = false;
      })
      .addCase(onLogin.fulfilled, (state, action) => {
        state.isLoader = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isError = false;
      })
      .addCase(onLogin.rejected, (state) => {
        state.isLoader = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export default signInSlice.reducer;
export const { setLoginDetails, logout } = signInSlice.actions;
