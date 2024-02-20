import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register, getLoyaltyPoints } from '../requestMethods';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await login(data);
            console.log("ResponseReduxLogin", response)
            if (response.status === 200) {
                const userData = await response.json();
                console.log("UserDataReduxLogin", userData)

                return userData;
            } else {
                return rejectWithValue(await response.json());
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await register(data);
            if (response.status === 200) {
                const userData = await response.json();
                return userData;
            } else {
                return rejectWithValue(await response.json());
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchLoyaltyPoints = createAsyncThunk(
    'user/fetchLoyaltyPoints',
    async (token, { rejectWithValue, getState }) => {

        try {
            // const state = getState();
            // const token = state.user?.jwt;

            console.log('Token:', token);
            if (!token) {
                throw new Error('Token not found'); // Token yoksa hata fırlatın
            }
            const response = await getLoyaltyPoints(token);
            if (response.status === 200) {
                const loyaltyPoints = await response.json();
                return loyaltyPoints;
            } else {
                return rejectWithValue(await response.json());
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);