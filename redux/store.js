import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
export default configureStore({
    reducer: {
        user: userSlice,
    },
});

const combinedReducer = combineReducers({
    userSlice: userSlice,
});


const rootReducer = combineReducers({ userSlice: userSlice, });


export const store = configureStore({
    reducer: rootReducer,
});