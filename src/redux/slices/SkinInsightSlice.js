import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequestWithParams } from '../../api/auth';

export const postSkincareForm = createAsyncThunk(
  'auth/verifyOtp',
  async (data,  { rejectWithValue }) => {
    try {
      const response = await postRequestWithParams('/Authentication/addSkinInsightUser', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'form send failed');
    }
  }
);

const SkinInsightSlice = createSlice({
  name: 'skinCareInfo',
  initialState: {
    skinFormData:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSkincareForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSkincareForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.skinFormData = action.payload;
      })
      .addCase(postSkincareForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default SkinInsightSlice.reducer;
