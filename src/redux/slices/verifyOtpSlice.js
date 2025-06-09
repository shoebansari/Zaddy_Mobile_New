import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../api/auth';

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ username, otp }, { rejectWithValue }) => {
    try {
      const response = await postRequest('/Authentication/verifyOtp', { username, otp });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'Verification failed');
    }
  }
);

const verifyOtpSlice = createSlice({
  name: 'verifyOtp',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default verifyOtpSlice.reducer;
