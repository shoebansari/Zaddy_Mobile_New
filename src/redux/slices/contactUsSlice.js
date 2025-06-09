import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../api/auth';

// Define the async action for the API request
export const addContactUs = createAsyncThunk(
  'contact/addContactUs',
  async (contactData, thunkAPI) => {
    try {
      const response = await postRequest('/Product/addAllcontactus', contactData)
      return response.data
   
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const contactUsSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContactUs.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addContactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactUsSlice.reducer;
