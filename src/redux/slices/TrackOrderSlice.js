// src/store/slices/trackOrderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequestWithParams } from '../../api/auth';

export const fetchTrackOrder = createAsyncThunk(
  'trackOrder/fetchTrackOrder',
  async (OrderNo, { rejectWithValue }) => {
    try {
      const data = await getRequestWithParams('/Order/getOrdersBySearchAdmin', { searchValue: OrderNo });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trackOrderSlice = createSlice({
  name: 'trackOrder',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTrackOrder: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrackOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTrackOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrackOrder } = trackOrderSlice.actions;
export default trackOrderSlice.reducer;
