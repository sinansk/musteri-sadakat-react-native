import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register, getLoyaltyPoints, getRewardRequests, getProfile } from '../requestMethods';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await login(data);
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
            if (!token) {
                throw new Error('Token not found'); // Token yoksa hata fırlatın
            }
            const response = await getLoyaltyPoints(token);
            if (response.status === 200) {
                const loyaltyPoints = await response.json();
                console.log(loyaltyPoints, "loyaltyPointsRedux")
                return loyaltyPoints;
            } else {
                return rejectWithValue(await response.json());
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchRewardRequests = createAsyncThunk(
    'user/fetchRewardRequests',
    async (token, { rejectWithValue }) => {
        try {
            const response = await getProfile(token);
            if (response.ok) { // response.ok durumunu kontrol edin
                const data = await response.json();
                const sortedRewardRequests = data.reward_requests.sort((a, b) => {
                    return new Date(b.requestDate) - new Date(a.requestDate);
                });
                return sortedRewardRequests; // Eylem yükü olarak sıralanmış ödül taleplerini döndürün
            } else {
                return rejectWithValue(await response.json());
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


