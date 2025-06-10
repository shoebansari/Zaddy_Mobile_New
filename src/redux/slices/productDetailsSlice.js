
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequestWithData } from "../../api/auth";

export const getAllProductDetails = createAsyncThunk(
  "productDetails/getAllProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await postRequestWithData(
        '/Product/getByIdProduct',
         id 
      );
      
      if (!response || !response.data) {
        throw new Error("Invalid product data received");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product details");
    }
  }
);


const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    productData: null,
    similarProducts: [],
    faqs: [],
    faqIngredients: [],
    faqWithProducts: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload.productDetail;
        state.similarProducts = action.payload.similarProduct || [];
        state.faqs = action.payload.faq || [];
        state.faqIngredients = action.payload.faqIngredient || [];
        state.faqWithProducts = action.payload.faqWithProduct || [];
        state.error = null;
      })
      .addCase(getAllProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export default productDetailsSlice.reducer;