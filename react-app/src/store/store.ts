import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./reducers/LoginSlice"
import streamReducer from "./reducers/StreamSlice"
import { streamApi } from "../services/StreamService";
import { FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';

const persistConfig = {
    key: "root",
    storage
}

const persistedLoginReducer = persistReducer(persistConfig,loginReducer)

const rootReducer = combineReducers({
    streamReducer,
    persistedLoginReducer,
    [streamApi.reducerPath]: streamApi.reducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(streamApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
