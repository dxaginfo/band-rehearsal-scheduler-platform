import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Import slices
import authReducer from './slices/authSlice';
import groupsReducer from './slices/groupsSlice';
import rehearsalsReducer from './slices/rehearsalsSlice';
import availabilityReducer from './slices/availabilitySlice';
import notificationsReducer from './slices/notificationsSlice';
import uiReducer from './slices/uiSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupsReducer,
    rehearsals: rehearsalsReducer,
    availability: availabilityReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
        ignoredPaths: ['auth.user', 'rehearsals.items.startTime', 'rehearsals.items.endTime'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;