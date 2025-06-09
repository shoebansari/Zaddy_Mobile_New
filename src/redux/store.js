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
import forgotPasswordReducer from './slices/resetPasswordSlice';
import filterReducer from './slices/filterSlice';
import trackOrderReducer from './slices/TrackOrderSlice';
import signInReducer  from './slices/signInSlice';
import signUpReducer from './slices/signupSlice';
import varifyOtpReducer from './slices/verifyOtpSlice';
import cartReducer from './slices/cartSlice';


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
  signInSlice: signInReducer,
  signUpSlice: signUpReducer,
  varifyOtpSlice: varifyOtpReducer,
  cartSlice: cartReducer,
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