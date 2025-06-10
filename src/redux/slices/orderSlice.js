import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequestUserId,
  getRequestWithToken,
  postRequestWithToken,
} from "../../api/auth";
import axios from 'axios';

const API_ENDPOINTS = {
  ADD_ORDER_WITH_DETAILS: "/Order/addOrderWithDetails",
};

export const getAllOrderByUserId = createAsyncThunk(
  "order/getAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getRequestUserId(
        "/Order/getAllOrderByUserId", userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories")
    }
  });


export const addOrderWithDetails = createAsyncThunk(
  "order/addOrderWithDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        "/Order/addOrderWithDetails",
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories"
      );
    }
  }
);

export const getOrdersBySearchAdmin = createAsyncThunk(
  "order/getAllOrdersByOrderNo",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getRequestWithToken(
        `${API_ENDPOINTS.GET_ORDER_BY_SEARCH_ADMIN}?searchValue=${orderId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching orders by order number:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch orders"
      );
    }
  }
);

export const updateOrderStatusUser = createAsyncThunk(
  "order/updateOrderStatusUser  ",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.UPDATE_ORDER_STATUS_USER,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories"
      );
    }
  }
);

export const returnOrder = createAsyncThunk(
  "order/returnOrder ",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.RETURN_ORDER,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories"
      );
    }
  }
);

export const fetchOrderDetailsByOrderNo = createAsyncThunk(
  'orderDetails/fetchByOrderNo',
  async ({orderId}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.zaddycare.in/api/Order/getOrdersBySearchAdmin?searchValue=${orderId}`,
      );
      return response.data.data[0]; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    success: null,
    orderData: [],
    orderHistory: [],
    updateOrderStatusUser: null,
    returnOrderData: null,
    orderDetails: [],
    orderDataByOrderNo: [],
    getAllOrderByUserIdData: null,
  },
  reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(addOrderWithDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addOrderWithDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.orderData = action.payload;
          state.error = null;
        })
        .addCase(addOrderWithDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getAllOrderByUserId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
          state.loading = false;
          state.orderHistory = action.payload;
          state.error = null;
        })
        .addCase(getAllOrderByUserId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getOrdersBySearchAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrdersBySearchAdmin.fulfilled, (state, action) => {
          state.loading = false;
          state.orderDataByOrderNo = action.payload;
          state.error = null;
        })
        .addCase(getOrdersBySearchAdmin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateOrderStatusUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateOrderStatusUser.fulfilled, (state, action) => {
          state.loading = false;
          state.updateOrderStatusUserData = action.payload;
          state.error = null;
        })
        .addCase(updateOrderStatusUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(returnOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(returnOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.returnOrderData = action.payload;
          state.error = null;
        })
        .addCase(returnOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchOrderDetailsByOrderNo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOrderDetailsByOrderNo.fulfilled, (state, action) => {
          state.loading = false;
          state.orderDetails = action.payload;
        })
        .addCase(fetchOrderDetailsByOrderNo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  
});
// export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
