import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestNoToken } from '../../api/auth';

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  const data = await getRequestNoToken("/Dashboard/getAllCategories");
  return {
    menu: data.data.menu || [],  
    bestSeller: data.data.bestSeller || [],
    bestRecommended: data.data.bestRecommended || [],
    bestArrial: data.data.bestArrial || []
  };
});

export const fetchNotification = createAsyncThunk("fetchNotification", async () => {
  const data = await getRequestNoToken("/Notification/getAllNotification");
  return data.data; 
});

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    categoryList: {
      menu: [],
      bestSeller: [],
      bestRecommended: [],
      bestArrial: []
    },
    notificationList: [], 
    isLoader: false,
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoader = false;
      state.categoryList = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
    builder.addCase(fetchNotification.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.isLoader = false;
      state.notificationList = action.payload; 
    });
    builder.addCase(fetchNotification.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default homeSlice.reducer;
