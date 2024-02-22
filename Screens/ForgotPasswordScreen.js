import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { forgotPassword } from '../requestMethods';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles';
const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const handleForgotPassword = () => {
        forgotPassword(email)
            .then(response => response.json())
            .then(data => {
                console.log('Forgot password response:', data);
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Login')} style={styles.forgotPasswordContainer}>
                {/* <Text style={styles.forgotPassword}>Go Back</Text> */}
                <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
            <Text style={styles.title}>Şifrenizi mi unuttunuz?</Text>
            <Text style={styles.subtitle}>Aşağıya email adresinizi girerek şifrenizi sıfırlama talebinde bulunabilirsiniz.</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Adresi"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleForgotPassword}>
                <Text style={globalStyles.buttonText}>Onay Ver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: '#18181b'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export default ForgotPasswordScreen;
