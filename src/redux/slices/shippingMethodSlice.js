import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestNoToken } from "../../api/auth";


export const fetchAllPinCode = createAsyncThunk(
  "size/fetchAllPinCode",
  async (pinCode, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(`/ShippingMethod/getAllPinCode?pinCode=${pinCode}`);
      if (!response || !response.data) {
        throw new Error("Invalid size data received");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching sizes");
    }
  }
);

const shippingMethodSlice = createSlice({
  name: "shippingMethod",
  initialState: {
    loading: false,
    error: null,
    allpinCodeData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPinCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPinCode.fulfilled, (state, action) => {
        state.allpinCodeData = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchAllPinCode.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default shippingMethodSlice.reducer;
