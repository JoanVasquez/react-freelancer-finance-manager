import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore}  from "redux-persist";
import storage from "redux-persist/lib/storage";

import financeReducer from './slices/financeSlice';
import taxReducer from './slices/taxSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
    key: "root",
    storage
};

const persistedFinance = persistReducer(persistConfig, financeReducer);
const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        finance: persistedFinance,
        tax: taxReducer,
        user: persistedUser,
    },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
