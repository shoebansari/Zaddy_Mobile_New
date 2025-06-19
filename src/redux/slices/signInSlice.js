import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequestWithToken } from '../../api/auth';

export const onLogin = createAsyncThunk("signIn/onLogin", async (body) => {
  const res = await postRequestWithToken("/Authentication/appLogin", body);
  if (res.statusCode === 200) {
    await AsyncStorage.setItem('loginDetails', JSON.stringify(res.data));
    await AsyncStorage.setItem('token', res.token);
  }
  return {
    isAuthenticated: res.statusCode === 200,
    data: res.data,
    token: res.token,
  };
});

// Thunk to load user from storage on app start
export const loadUserFromStorage = createAsyncThunk('signIn/loadUserFromStorage', async () => {
  const userData = await AsyncStorage.getItem('loginDetails');
  const token = await AsyncStorage.getItem('token');
  if (userData && token) {
    return {
      user: JSON.parse(userData),
      token,
    };
  }
  return {
    user: null,
    token: null,
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
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      });
  },
});

export default signInSlice.reducer;
export const { logout } = signInSlice.actions;