import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';    // Importing redux-persist functions and constants for persisting the Redux store
import storage from 'redux-persist/lib/storage';                                                                    // Importing storage from redux-persist for using local storage as the default storage
import { configureStore } from '@reduxjs/toolkit';                                                                  // Importing the configureStore function from Redux Toolkit

// Importing slices
import CredentialSlice from './slices/credential.slice';

// Configuration for persisting
const CredentialPersistConfig = { key: 'credential', storage };

export const store = configureStore({
    reducer: {
        credential: persistReducer(CredentialPersistConfig, CredentialSlice),           // Persisting the credential slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)                    // Creating a persistor for the store
export type RootState = ReturnType<typeof store.getState>;      // Define the RootState type based on the store's state
export type AppDispatch = typeof store.dispatch;                // Define the AppDispatch type based on the store's dispatch function