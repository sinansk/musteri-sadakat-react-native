import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const createModal = (title, onConfirm) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const handleConfirm = () => {
        onConfirm(inputValue);
        hideModal();
    };

    return (
        <View style={styles.container}>
            <Button title={title} onPress={showModal} />
            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Eklemek istediğiniz başka bir şey var?</Text>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={setInputValue}
                            placeholder="Açıklama"
                            placeholderTextColor="#666"
                        />
                        <Button title="Okay" onPress={handleConfirm} />
                        <Button title="Cancel" onPress={hideModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
