import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, getProfile, login, updateProfile } from '../requestMethods';
import ModalComponent from '../Components/Modals/Modal';
import ReAuthModal from '../Components/Modals/ReAuthModal';
import { loginUser } from '../redux/userThunk';
import globalStyles from '../styles';
import { errorToast, successToast } from '../toasts';

const ProfileScreen = () => {
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [updatedPassword, setUpdatedPassword] = useState({});
    const modalRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        getProfile(jwt)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setUpdatedData(data); // Güncellenecek verileri alınan verilere eşitle
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    const handleUpdateButton = () => {
        setIsEditing(true);
        modalRef.current.openModal();
    };

    const handleUpdate = async (password) => {
        const loginResponse = await dispatch(loginUser({ username: userData.email, password }))
        if (loginResponse.payload && !loginResponse.payload.error) {
            updateProfile(jwt, updatedData, userData.id)
                .then(() => {
                    fetchUserData();
                    modalRef.current.closeModal();
                    successToast('Profile updated successfully');
                })
                .catch(error => console.error('Error updating user data:', error));
        }
        if (updatedPassword.password && updatedPassword.password === updatedPassword.confirmPassword) {
            changePassword(jwt, password, updatedPassword.password, updatedPassword.confirmPassword)
                .then(response => response.json())
                .then(data => {
                    console.log('Password change response:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else if (updatedPassword.password !== updatedPassword.confirmPassword) {
            modalRef.current.closeModal();
            errorToast('Passwords do not match');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileInfo}>
                <Image source={require('../assets/settings.png')} style={styles.profileImage} />
                <Text>User Name</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={userData.email}
                    value={updatedData.username}
                    onChangeText={text => setUpdatedData({ ...updatedData, username: text })}
                />

                <Text>E Mail</Text>
                <TextInput
                    style={globalStyles.input}
                    defaultValue={userData.email}
                    value={updatedData.email}
                    onChangeText={text => setUpdatedData({ ...updatedData, email: text })}
                />
                <Text>Address</Text>
                <TextInput
                    style={globalStyles.input}
                    defaultValue={userData.email}
                    value={updatedData.address}
                    onChangeText={text => setUpdatedData({ ...updatedData, address: text })}
                />


                <Text style={globalStyles.inputLabel}>Phone</Text>
                <TextInput
                    style={globalStyles.input}
                    defaultValue={userData.email}
                    value={updatedData.phone}
                    onChangeText={text => setUpdatedData({ ...updatedData, phone: text })}
                />
                <Text>New Password</Text>
                <TextInput
                    style={globalStyles.input}
                    value={updatedPassword.password}
                    onChangeText={text => setUpdatedPassword({ ...updatedPassword, password: text })}
                    secureTextEntry
                />
                <Text>Confirm Password</Text>
                <TextInput
                    style={globalStyles.input}
                    value={updatedPassword.confirmPassword}
                    onChangeText={text => setUpdatedPassword({ ...updatedPassword, confirmPassword: text })}
                    secureTextEntry
                />
                <Pressable
                    style={globalStyles.button}
                    onPress={handleUpdateButton}
                >
                    <Text style={globalStyles.buttonText}>Update</Text>
                </Pressable>
                <ModalComponent ref={modalRef}>
                    <ReAuthModal onConfirm={(password) => handleUpdate(password)} />
                </ModalComponent>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    profileInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#eab308'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
});

export default ProfileScreen;
