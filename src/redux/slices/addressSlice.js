import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCreate, getRequestUserId, postRequestWithToken, postCreateWithUpdatedBy } from "../../api/auth";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequestUserId(`/Address/getAddressList`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch address list"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken("/Address/addAddress", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postCreate("/Address/updateAddress", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      await postCreateWithUpdatedBy("/Address/deleteAddress", addressData);
      return { addressId: addressData.addressId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete address"
      );
    }
  }
);


const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    error: null,
    success: false,
    addressData: [],
    addressList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = true;
        state.addressList = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressData.push(action.payload); 
        state.success = true;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.addressData = state.addressData.map(item =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addressList = state.addressList.filter(
          (addr) => addr.addressId !== action.payload.addressId
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default addressSlice.reducer;
