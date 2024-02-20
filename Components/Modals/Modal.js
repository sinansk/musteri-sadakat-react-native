import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ModalComponent = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => open(),
        closeModal: () => close(),
    }));

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    const destroyModal = () => {
        close();
        // props.onModalClosed(); // Burada modalın kapatılma olayını tetikleyen bir prop kullanıldığını varsayıyorum
    };

    if (!isOpen) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                destroyModal();
            }}
        >
            <TouchableOpacity
                onPress={() => destroyModal()}
                style={styles.overlay}
            />
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    onPress={() => destroyModal()}
                    style={styles.closeButton}
                >
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        right: '10%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        zIndex: 100,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 20,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        marginTop: 20,
    },
});

export default ModalComponent;
