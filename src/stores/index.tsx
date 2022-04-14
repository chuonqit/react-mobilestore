import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth.slice";
import cartReducer from "./slices/cart.slice";
import { adminApi, clientApi } from "../services/baseApi.service";
import productsReducer from "./slices/products.slice";

const reducers = combineReducers({
    [authReducer.name]: authReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [productsReducer.name]: productsReducer.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
});

const persistConfig = {
    key: "bootmobile",
    storage,
    whitelist: [authReducer.name, cartReducer.name],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [thunk, adminApi.middleware, clientApi.middleware];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(...middlewares),
    devTools: true,
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
