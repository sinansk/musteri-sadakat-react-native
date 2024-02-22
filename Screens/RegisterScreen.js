import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text, Image } from 'react-native';
import globalStyles from '../styles';
import { useNavigation } from '@react-navigation/native'; // useNavigation hook'unu ekledik
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/userThunk';
import { errorToast, successToast } from '../toasts';

export default RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {
            const response = await dispatch(registerUser({ username, email, password, number }));
            console.log('Response:', response);
            if (response.payload && !response.payload.error) {
                navigation.navigate('Home');
                successToast('Successfully registered');
            } else if (response.payload.error) {
                errorToast('Invalid username or password');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Pressable onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                {/* <Text style={styles.forgotPassword}>Go Back</Text> */}
                <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
            <Text style={globalStyles.title}>Register</Text>
            <Image source={require('../assets/login.png')} style={globalStyles.loginImage} />
            <Text style={globalStyles.inputLabel}>Username</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Username"
                placeholderTextColor={'#334155'}
                value={username}
                onChangeText={setUsername}
            />
            <Text style={globalStyles.inputLabel}>Email</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'#334155'}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={globalStyles.inputLabel}>Phone number (optional)</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Phone number (optional)"
                placeholderTextColor={'#334155'}
                value={number}
                onChangeText={setNumber}
            />
            <Text style={globalStyles.inputLabel}>Password</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Password"
                placeholderTextColor={'#334155'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable style={globalStyles.button} onPress={handleRegister}>
                <Text style={globalStyles.buttonText}>Register</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100,
    },
}); 