import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmationModal = ({ onConfirm, onCancel }) => {


    const handleSubmit = () => {
        onConfirm();
        onCancel();
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Are you sure you want to delete this ?</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: '#18181b',
        margin: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',

        width: '100%',
    }
});

export default ConfirmationModal;
