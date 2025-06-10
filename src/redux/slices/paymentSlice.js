import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getRequest } from "../../api/auth";

export const fetchPaymentMode = createAsyncThunk(
  "payment/fetchPaymentMode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/Payment/getPaymentMode");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    success: null,
    paymentData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMode.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(fetchPaymentMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default paymentSlice.reducer;
