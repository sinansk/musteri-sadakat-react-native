import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser, fetchLoyaltyPoints, fetchRewardRequests } from './userThunk';
const initialState = {
    user: null,
    loading: false,
    error: null
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
        deleteRewardRequestFromRedux: (state, action) => {
            state.user.rewardRequests = state.user.rewardRequests.filter(request => request.id !== action.payload);
        }
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
                const loyaltyPoints = action.payload.data.find(d => {
                    const usersData = d.attributes.users?.data;
                    return usersData.some(user => user?.id === state.user.user.id);
                });

                state.user.loyaltyPoints = loyaltyPoints?.attributes.pointAmount || 0;
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
                state.user.rewardRequests = action.payload;
            })
            .addCase(fetchRewardRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    },
});

export const { setUser, clearUser, deleteRewardRequestFromRedux } = userSlice.actions;

export default userSlice.reducer;
