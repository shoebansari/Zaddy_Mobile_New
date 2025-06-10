
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  getRequest } from "../../api/auth";

export const fetchCountries = createAsyncThunk(
  "geography/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/Geography/getAllCountry");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching countries"
      );
    }
  }
);
export const fetchStates = createAsyncThunk(
  "geography/fetchStates",
  async (countryId, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        `/Geography/getAllState?Fk_CountryId=${countryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching states");
    }
  }
);
export const fetchCities = createAsyncThunk(
  "geography/fetchCities",
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        `/Geography/getAllCity?Fk_StateId=${stateId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cities");
    }
  }
);
const geographySlice = createSlice({
  name: "geography",
  initialState: {
    region: [],
    countries: [],
    states: [],
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload;
        state.loading = false;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.loading = false;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export default geographySlice.reducer;