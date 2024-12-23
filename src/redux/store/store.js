import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import eventReducer from '../slices/eventSlice';

// Redux Persist Configuration
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['events'], 
};

// Combine reducers
const rootReducer = combineReducers({
    events: eventReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
