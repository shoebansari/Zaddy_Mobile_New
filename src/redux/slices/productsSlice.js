import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequestWithData, getRequestNoToken } from '../../api/auth';

export const getAllProduct = createAsyncThunk(
  "products/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(
        "/Product/getAllProduct"
      );
      if (!response || !response.data) {
        throw new Error("Invalid filter data received");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching brands");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async () => {
    try {
      const response = await postRequestWithData('/Filter/getProductSearchByFilter', {});
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchSortByData = createAsyncThunk(
  'products/fetchSortByData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken('/Filter/getAllFilter');
      if (!response || !response.data) {
        throw new Error("Invalid filter data received");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching brands");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(`/Product/searchProduct/${data}`);
      if (!response || !response.data) {
        throw new Error("Invalid color data received");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching colors");
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    sorts: [],
    searchProductData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSortByData.pending, (state) => {
        state.isLoader = true;
        state.error = null;
      })
      .addCase(fetchSortByData.fulfilled, (state, action) => {
        state.sorts = action.payload.sortBy || [];
        state.isLoader = false;
      })
      .addCase(fetchSortByData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoader = false;
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchProductData = action.payload || [];
        state.loading = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export default productsSlice.reducer;
