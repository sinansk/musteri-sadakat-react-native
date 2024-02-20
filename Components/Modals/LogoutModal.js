import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../../styles';

const LogoutModal = ({ onConfirm, onCancel }) => {


    const handleSubmit = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Are you sure you want to log out ?</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
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
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LogoutModal;