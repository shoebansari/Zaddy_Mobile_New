import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../api/auth";
  
export const getAllCoupon = createAsyncThunk(
  "discount/getAllCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/Discount/getAllCoupon");
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

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    loading: false,
    error: null,
    success: null,
    discountData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.discountData = action.payload;
        state.error = null;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});
export default discountSlice.reducer;
