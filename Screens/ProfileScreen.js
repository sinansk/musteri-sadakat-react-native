import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, login, updateProfile } from '../requestMethods';
import ModalComponent from '../Components/Modals/Modal';
import ReAuthModal from '../Components/Modals/ReAuthModal';
import { loginUser } from '../redux/userThunk';
import globalStyles from '../styles';
const ProfileScreen = () => {
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
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
                console.log('User data:', data);
                setUpdatedData(data); // Güncellenecek verileri alınan verilere eşitle
            })
            .catch(error => console.error('Error fetching user data:', error));
    };
    const handleUpdateButton = () => {
        setIsEditing(true);
        modalRef.current.openModal();
    };
    const handleUpdate = (password) => {
        dispatch(loginUser({ username: userData.email, password }))
        updateProfile(jwt, updatedData, userData.id)
            .then(() => {
                // Düzenleme modunu kapat
                fetchUserData(); // Güncellenmiş verileri yeniden getir
            })
            .catch(error => console.error('Error updating user data:', error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                {/* <Image source={{ uri: userData.photo }} style={styles.profileImage} /> */}
                {/* {isEditing ? ( */}
                <Text>User Name</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={userData.email}
                    value={updatedData.username}
                    onChangeText={text => setUpdatedData({ ...updatedData, username: text })}
                />
                {/* ) : (
                    <Text style={styles.text}>{userData.username}</Text> */}
                {/* )}
                <Text style={styles.text}>{userData.email}</Text>
                {isEditing && ( */}
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
                {/* )}
                <Text style={styles.text}>{userData.address}</Text>
                {isEditing && ( */}
                <Text>Phone</Text>
                <TextInput
                    style={globalStyles.input}
                    defaultValue={userData.email}
                    value={updatedData.phone}
                    onChangeText={text => setUpdatedData({ ...updatedData, phone: text })}
                />
                {/* )} */}
                {/* <Text style={styles.text}>{userData.phone}</Text>
                {isEditing && ( */}
                {/* <Text>New Password</Text>
                <TextInput
                    style={styles.input}
                    value={userData.password}
                    onChangeText={text => setUpdatedData({ ...updatedData, password: text })}
                    secureTextEntry
                /> */}
                {/* )} */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
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
