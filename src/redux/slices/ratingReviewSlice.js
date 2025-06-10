import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequestWithData, postRequestWithParams, getRequestWithParams, getRequestNoToken } from "../../api/auth";


export const getAllReviewRating = createAsyncThunk(
  "review/getAllReviewRating",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(`/RatingReview/getAllRatingReview?productId=${productId}`);
      if (!response || !response.data) {
        throw new Error("Invalid data received");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const getAllReviewRatingStar = createAsyncThunk(
  "review/getAllReviewRatingStar",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getRequestNoToken(`/RatingReview/getAllRatingReviewstar?productId=${productId}`);

      if (!response || !response.data) {
        throw new Error("Invalid data received");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

const ratingReviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    error: null,
    ratingReviewData: [],
    ratingReviewStarData: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviewRating.fulfilled, (state, action) => {
        state.ratingReviewData = action.payload || [];
        state.loading = false;
      })
      .addCase(getAllReviewRating.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getAllReviewRatingStar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviewRatingStar.fulfilled, (state, action) => {
        state.ratingReviewStarData = action.payload || [];
        state.loading = false;
      })
      .addCase(getAllReviewRatingStar.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default ratingReviewSlice.reducer;
