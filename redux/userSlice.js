import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser, fetchLoyaltyPoints, fetchRewardRequests } from './userThunk';
const initialState = {
    user: null, // Kullanıcı bilgilerini burada saklayacağız
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log('LoginUserActionFulfilled:', action.payload);
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchLoyaltyPoints.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(fetchLoyaltyPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.user.loyaltyPoints = action.payload.data.filter(data => data.attributes.user.data.id === state.user.user.id)[0].attributes.pointAmount;
            })
            .addCase(fetchLoyaltyPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchRewardRequests.pending, (state, action) => {
                state.loading = true;
            }
            )
            .addCase(fetchRewardRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.user.rewardRequests = action.payload.data;
            })
            .addCase(fetchRewardRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
