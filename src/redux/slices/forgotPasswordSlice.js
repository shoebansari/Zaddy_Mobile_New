import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../api/auth';

export const sendOtp = createAsyncThunk(
  'forgotPassword/sendOtp',
  async (username, { rejectWithValue }) => {
    try {
      const response = await postRequest('/Authentication/sendOtp', { username });

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue({ success: false, message: 'Network error or server failure' });
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Unknown error';
      });
  },
});

export default forgotPasswordSlice.reducer;