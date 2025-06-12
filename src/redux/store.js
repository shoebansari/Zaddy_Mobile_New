import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import reducers here
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';
import productsReducer from './slices/productsSlice';
import skinInsightReducer from './slices/SkinInsightSlice';
import contactUsReducer from './slices/contactUsSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import filterReducer from './slices/filterSlice';
import trackOrderReducer from './slices/TrackOrderSlice';
import signInReducer  from './slices/signInSlice';
import signUpReducer from './slices/signupSlice';
import varifyOtpReducer from './slices/verifyOtpSlice';
import cartReducer from './slices/cartSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import ratingReviewReducer from './slices/ratingReviewSlice';
import shippingMethodReducer from './slices/shippingMethodSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';
import geographyReducer from './slices/geographySlice';
import paymentReducer from './slices/paymentSlice';
import couponReducer from './slices/couponSlice';
import verifyOtpReducer from './slices/verifyOtpSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'] // Add reducer names you want to persist
};

const rootReducer = combineReducers({
  // Add reducers here
  user: userReducer,
  homeSlice: homeReducer,
  productsSlice: productsReducer,
  skinInsightSlice: skinInsightReducer,
  contactUsSlice: contactUsReducer,
  forgotPasswordSlice: forgotPasswordReducer,
  filterSlice: filterReducer,
  trackOrderSlice: trackOrderReducer,
  loginSlice: signInReducer,
  signUpSlice: signUpReducer,
  varifyOtpSlice: varifyOtpReducer,
  cartSlice: cartReducer,
  productDetailsSlice: productDetailsReducer,
  ratingReviewSlice: ratingReviewReducer,
  shippingMethodSlice: shippingMethodReducer,
  addressSlice: addressReducer,
  orderSlice: orderReducer,
  geographySlice: geographyReducer,
  paymentSlice: paymentReducer,
  couponSlice: couponReducer,
  verifyOtpSlice: verifyOtpReducer,
  resetPasswordSlice: resetPasswordReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); 