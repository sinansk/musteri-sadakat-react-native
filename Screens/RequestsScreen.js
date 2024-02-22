import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Pressable, Modal, Image, StyleSheet } from 'react-native';
import { getProfile } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../Components/Modals/Modal';
import ConfirmationModal from '../Components/Modals/ConfirmationModal';
import { deleteRewardRequest } from '../requestMethods';
import { successToast } from '../toasts';
import { fetchRewardRequests } from '../redux/userThunk';
import { deleteRewardRequestFromRedux } from '../redux/userSlice';


const RequestsScreen = () => {
    const rewardRequests = useSelector(state => state.userSlice?.user?.rewardRequests);
    const [selectedRewardRequest, setSelectedRewardRequest] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const [deletedRequest, setDeletedRequest] = useState(null);
    const modalRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRewardRequests(jwt));
    }, []);


    const handleDeleteButton = (id) => {
        setDeletedRequest(id);
        modalRef.current.openModal();
    }
    const handleDeleteRequest = (id) => {
        deleteRewardRequest(jwt, id).then(response => response.json()).then(data => {
            dispatch(deleteRewardRequestFromRedux(id));
            successToast('Request deleted successfully');
        }).catch(error => {
            console.error('Error:', error);
        });
    }


    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.card} onPress={() => {
                setSelectedRewardRequest(item);
                setModalVisible(true);
            }}>
                {/* <Image source={{ uri: item.image && item.image }} style={styles.image} /> */}
                <View style={styles.info}>
                    <Text style={styles.title}>{item.description ? item.description.split(' - ')[0] : "TITLE"}</Text>
                    <Text style={styles.points}>Status: {item.status ? item.status : "Status"}</Text>
                    <Text style={styles.date}>Request Date: {item.requestDate ? item.requestDate : "Request Date"}</Text>

                </View>
                {item.status === "Bekliyor" && (
                    <Pressable onPress={() => handleDeleteButton(item.id)}>
                        <Text style={styles.deleteButton}>X</Text>
                    </Pressable>
                )}
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Reward Requests</Text>
            {rewardRequests && rewardRequests.length === 0 && (
                <>
                    <Text style={styles.info}>No reward requests</Text>
                    <Image source={require('../assets/nothing.png')} style={styles.image} />
                </>
            )}
            {rewardRequests && rewardRequests.length > 0 && (
                <FlatList
                    data={rewardRequests}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
            <ModalComponent ref={modalRef}>
                <ConfirmationModal onConfirm={() => handleDeleteRequest(deletedRequest)} onCancel={() => modalRef.current.closeModal()} />
            </ModalComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#eab308'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    info: {
        flex: 1,

    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    deleteButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#eab308',
        marginLeft: 'auto',
        marginVertical: 'auto'

    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 25,
        marginEnd: 'auto',
        marginStart: 'auto',
    },
    info: {
        marginEnd: 'auto',
        marginStart: 'auto',
    },

});

export default RequestsScreen;
