import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import globalStyles from '../styles';
import { useNavigation } from '@react-navigation/native'; // useNavigation hook'unu ekledik
import { FontAwesome5 } from '@expo/vector-icons';
export default RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const navigation = useNavigation();
    const handleRegister = async () => {
        try {
            // Strapi API ile iletişim kurmak için POST isteği gönder
            const response = await fetch('http://192.168.1.32:1337/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    number,
                }),
            });

            // API'den gelen yanıtı kontrol et
            const data = await response.json();
            if (response.ok) {
                // Başarılı bir şekilde kaydedildiğinde işlem yap
                // Alert.alert('Success', 'User registered successfully');
                console.log('Success:', data);
                navigation.navigate('Home')
                // İstenirse kayıt işleminden sonra otomatik olarak giriş ekranına yönlendirilebilir
                // navigation.navigate('Login');
            } else {
                // Hata varsa kullanıcıyı uyar
                Alert.alert('Error', data.message[0].messages[0].message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Pressable onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                {/* <Text style={styles.forgotPassword}>Go Back</Text> */}
                <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
            <TextInput
                style={globalStyles.input}
                placeholder="Username"
                placeholderTextColor={'#334155'}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'#334155'}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Phone number (optional)"
                placeholderTextColor={'#334155'}
                value={number}
                onChangeText={setNumber}
            />
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