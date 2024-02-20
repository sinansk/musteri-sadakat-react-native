import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../../styles';

const ReAuthModal = ({ onConfirm }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onConfirm(password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please re-enter your password!</Text>
            <Text style={styles.subtitle}>We need to make sure it's you</Text>
            <Text style={styles.note}>(If you changed your password please write your old password!)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleSubmit} style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    note: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ReAuthModal;