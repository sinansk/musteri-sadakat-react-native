import { getCurrentDateTimeInISOString } from "./utils/getCurrentDateTimeIso";

export const api = "https://willing-ants-185ca583cb.strapiapp.com/api/";
// export const api = "http://192.168.1.32:1337/api/";

export const authApi = `${api}auth`;

export const loginApi = `${api}auth/local`;

export const registerApi = `${api}auth/local/register`;

export const loyaltyPointsApi = `${api}loyalty-points`;

export const rewardsApi = `${api}rewards/?populate=*`;

export const rewardRequestsApi = `${api}reward-requests`;

export const userApi = `${api}users`;

export const meApi = `${api}users/me/?populate=*`;

export const login = async (data) => {
    const response = await fetch(loginApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: data.username,
            password: data.password,
        }),
    });
    return response;
};

export const register = async (data) => {
    const response = await fetch(registerApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
            number: data.number,
        }),
    });
    return response;
};

export const forgotPassword = async (email) => {
    const response = await fetch(`${authApi}/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            email: email,

        }),
    });
    return response;
};

export const getProfile = async (token) => {
    const response = await fetch(meApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}

export const updateProfile = async (token, data, userId) => {
    const response = await fetch(`${userApi}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response;
}
export const changePassword = async (jwt, currentPassword, updatedPassword, confirmPassword) => {
    const response = await fetch(`${authApi}/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            "currentPassword": currentPassword,
            "password": updatedPassword,
            "passwordConfirmation": confirmPassword,
        }),
    });
    return response;
}

export const getLoyaltyPoints = async (token) => {
    const response = await fetch(loyaltyPointsApi + `/?populate=*`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
};

export const getRewards = async (token) => {
    const response = await fetch(rewardsApi, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
}

export const makeRewardRequest = async (token, rewardId) => {
    const response = await fetch(`${rewardsApi}/${rewardId}/reward-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}
export const createRewardRequest = async (userId, jwt, requestedRewardId, modalInput) => {
    const dateTime = getCurrentDateTimeInISOString();
    try {
        const response = await fetch(rewardRequestsApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`, // Kullanıcı oturum açmışsa JWT tokenını göndermek için
            },
            body: JSON.stringify({
                data: {
                    requestDate: dateTime, // Tarih ve saat bilgisini birleştirme
                    status: 'Bekliyor', // Otomatik olarak bekleyen durumu atama
                    description: modalInput,
                    reward: requestedRewardId, // Seçilen ödülün ID'sini gönderme
                    user: userId, // Kullanıcının ID'sini gönderme
                },
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Reward request oluşturulurken bir hata oluştu:', error);
        throw error;
    }
};

export const getRewardRequests = async (token) => {
    const response = await fetch(rewardRequestsApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}

export const deleteRewardRequest = async (token, rewardRequestId) => {
    const response = await fetch(`${rewardRequestsApi}/${rewardRequestId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}



