import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import reducers here
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'] // Add reducer names you want to persist
};

const rootReducer = combineReducers({
  // Add reducers here
  user: userReducer,
  homeSlice: homeReducer,
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