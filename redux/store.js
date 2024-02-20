import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import modal from './modal';
export default configureStore({
    reducer: {
        user: userSlice,
        modal: modal,
    },
});

const combinedReducer = combineReducers({
    userSlice: userSlice,
    modal: modal,
});


const rootReducer = combineReducers({ userSlice: userSlice, modal: modal });


export const store = configureStore({
    reducer: rootReducer,
});