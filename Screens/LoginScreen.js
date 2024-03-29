import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text, Image } from 'react-native';
import globalStyles from '../styles';
import { loginUser } from '../redux/userThunk';
import { login } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { errorToast } from '../toasts';


export default LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await dispatch(loginUser({ username, password }));

            if (response.payload && !response.payload.error) {
                navigation.navigate('Home');
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
            <Text style={globalStyles.title}>Login</Text>
            <Image source={require('../assets/login.png')} style={globalStyles.loginImage} />
            <Text style={globalStyles.inputLabel}>Username or email</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Username or Email"
                placeholderTextColor={'#334155'}
                keyboardType="email-address"
                value={username}
                onChangeText={setUsername}
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
            <View style={styles.linkContainer}>
                {/* <Pressable onPress={() => navigation.navigate('ForgotPassword')} >
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable> */}
                <Pressable onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.registerButton}>I am not a member!</Text>
                </Pressable>
            </View>
            <Pressable style={globalStyles.button} onPress={handleLogin}>
                <Text style={globalStyles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: '#18181b',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    forgotPasswordContainer: {
        color: '#eab308',
        textAlign: 'left',
        marginEnd: 'auto',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    forgotPassword: {
        color: '#eab308',
        textAlign: 'left',
        marginEnd: 'auto'
    },
    registerButton: {
        color: '#eab308',
        textAlign: 'right',
        marginStart: 'auto',
        justifyContent: 'flex-end'
    }
});