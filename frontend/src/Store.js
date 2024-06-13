// import {configureStore} from '@reduxjs/toolkit'
// import ProductSlice from './features/ProductSlice'
// import UserSlice from './features/UserSlice'
// import appAPI from './services/appApi'


// //persit Our Store
// import storage from 'redux-persist/lib/storage'
// import {combineReducers} from 'redux'
// import {persistReducer} from 'redux-persist'
// import thunk from 'redux-thunk'


// //reducers
// const reducer = combineReducers({
//     user:UserSlice,
//     products: ProductSlice,
//     [appAPI.reducerPath]:appAPI.reducer,
// });

// const persistConfig ={
//     key:'root',
//     storage,
//     blackList:[appAPI.reducerPath,'products'],
// };

// //persist Our Store
// const PersistReducer =persistReducer(persistConfig,reducer);


// //Creating the Store
// const store = configureStore({
//     reducer:PersistReducer,
//     middleware: [thunk,appAPI.middleware],
// })


// export default store;


import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './features/ProductSlice';
import UserSlice from './features/UserSlice';
import appAPI from './services/appApi';

// Persist our Store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk'; // Correct import

// Reducers
const reducer = combineReducers({
    user: UserSlice,
    product: ProductSlice,
    [appAPI.reducerPath]: appAPI.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appAPI.reducerPath, 'product'], // Fixed typo: blackList -> blacklist
};

// Persist our Store
const persistedReducer = persistReducer(persistConfig, reducer);

// Creating the Store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }).concat(thunk, appAPI.middleware), // Use concat to add middleware
});

export default store;
