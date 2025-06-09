import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequestWithToken,postRequestWithData } from '../../api/auth';

export const onRegister = createAsyncThunk("signUp/onRegister", async (body) => {
  const res = await postRequestWithToken("/Authentication/addAppUser", body);

  if (res.statusCode === 200) {
    await AsyncStorage.setItem('RegisterDetails', JSON.stringify(res.data));
    await AsyncStorage.setItem('token', JSON.stringify(res.token));
  }
  return {
    isAuthenticated: res.statusCode === 200,
    data: res.data,
    token: res.token,
  };
});

export const updateAppUser = createAsyncThunk(
  "signUp/updateAppUser",
  async (updateAppUserData, { rejectWithValue }) => {
    try {
      const response = await postRequestWithData(
       "/api/Authentication/updateAppUser",
        updateAppUserData
      );
      return response;
    } catch (error) {
      console.error("OTP Verify Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  updateAppUserData: null,
  isLoader: false,
  isError: false,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setRegisterDetails: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('registerDetails');
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onRegister.pending, (state) => {
        state.isLoader = true;
        state.isError = false;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.isLoader = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isError = false;
      })
      .addCase(onRegister.rejected, (state) => {
        state.isLoader = false;
        state.isError = true;
        state.isAuthenticated = false;
      })
      .addCase(updateAppUser.pending, (state) => {
        state.loading = true;
        state.isError = null;
      })
      .addCase(updateAppUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updateAppUserData = action.payload;
      })
      .addCase(updateAppUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = action.payload;
      })
  },
});

export default signUpSlice.reducer;
export const { setRegisterDetails, logout } = signUpSlice.actions;
