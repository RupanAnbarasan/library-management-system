import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

const presistConfig = {
    key:'root',
    storage,
    blacklist: ['nonSerializableField'],
} 

const persistedLoginReducer = persistReducer(presistConfig,loginReducer);
export const store = configureStore({
    reducer: {
        login:persistedLoginReducer
    }
}) 

export const persistor = persistStore(store)