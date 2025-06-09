import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../api/auth';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await postRequest('/Authentication/forgotPassword', {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Reset failed');
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resetPasswordSlice.reducer;
