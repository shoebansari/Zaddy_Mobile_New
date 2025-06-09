import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequestWithData, getRequestNoToken } from "../../api/auth";
const API_ENDPOINTS = {
  GET_ALL_FILTER: "/Filter/getAllFilter",
  //SEARCH_ALL_SKIN_INSIGHT_PRODUCT: "/Filter/SearchAllSkinInsightProduct"
};



export const fetchFilter = createAsyncThunk(
  "filter/fetchFilter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(API_ENDPOINTS.GET_ALL_FILTER);
      if (!response || !response.data) {
        throw new Error("Invalid filter data received");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching brands");
    }
  }
);

export const searchAllSkinInsightProduct = createAsyncThunk(
  "filter/searchAllSkinInsightProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithData(
       "/Filter/SearchAllSkinInsightProduct",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching brands");
    }
  }
);
const filterSlice = createSlice({
  name: "filter",
  initialState: {
    loading: false,
    error: null,
    filterData: [],
    searchAllSkinInsightProductData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(searchAllSkinInsightProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAllSkinInsightProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchAllSkinInsightProductData = action.payload;
      })
      .addCase(searchAllSkinInsightProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export default filterSlice.reducer;