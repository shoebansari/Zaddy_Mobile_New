import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCreate } from '../../api/auth';


export const addProductInCart = createAsyncThunk(
  "cart/addProductInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postCreate(
       "/Cart/addProductInCart",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding product to cart"
      );
    }
  }
);

export const updateQuantityInCart = createAsyncThunk(
  "cart/updateQuantityInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postCreate(
        "/Cart/updateQuantityInCart",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating quantity");
    }
  }
);

export const productRemoveInCart = createAsyncThunk(
  "cart/productRemoveInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postCreate(
        "/Cart/productRemoveInCart",
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error removing product from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cartData: [],
    cartCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(addProductInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateQuantityInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(updateQuantityInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productRemoveInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productRemoveInCart.fulfilled, (state, action) => {
        state.loading = false;
        
        const storedCart =
          JSON.parse(localStorage.getItem("allCartItems")) || [];
        const updatedCart = storedCart.filter(
          (item) => item.productId !== removedProductId
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      })
      .addCase(productRemoveInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setCartItems} = cartSlice.actions;

export default cartSlice.reducer;