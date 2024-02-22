import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Pressable, Image } from 'react-native';
import { globalStyles } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchLoyaltyPoints } from '../redux/userThunk';
import { createRewardRequest, getLoyaltyPoints, getRewards } from '../requestMethods';
import ModalComponent from '../Components/Modals/Modal';
import RewardRequestModal from '../Components/Modals/RewardRequestModal';
import { api } from '../requestMethods';
import { successToast } from '../toasts';

export default HomeScreen = ({ route }) => {

    const dispatch = useDispatch();
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const loyaltyPoints = useSelector(state => state?.userSlice?.user?.loyaltyPoints);
    const userName = useSelector(state => state?.userSlice?.user?.user?.username);
    const userId = useSelector(state => state?.userSlice?.user?.user?.id)
    const [rewards, setRewards] = useState(null);
    const [modalInput, setModalInput] = useState(null);
    const modalRef = useRef()

    const [requestedReward, setRequestedReward] = useState(null);
    useEffect(() => {
        dispatch(fetchLoyaltyPoints(jwt))
        getRewards(jwt).then(response => response.json()).then(data => {
            setRewards(data.data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [jwt])

    const handleRequestButton = (reward) => {
        setRequestedReward(reward);
        setModalInput(null)
        modalRef.current.openModal()
    }

    const handleRewardRequest = (modalInput) => {
        const description = `${requestedReward.attributes.rewardName} - ${modalInput}`
        createRewardRequest(userId, jwt, requestedReward.id, description).then(response => console.log(response)).then(data => {
        }).catch(error => {
            console.error('Error:', error);
        }
        )
        successToast('Reward request sent successfully');
        modalRef.current.closeModal();
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.username}>{userName ?? "John Doe"}</Text>
                <Text style={styles.loyaltyPoints}>Loyalty Points: {loyaltyPoints ?? "-"}</Text>
                <ScrollView style={styles.rewardsContainer} horizontal>
                    {rewards ? rewards?.map(reward => {
                        return (
                            <View style={styles.rewardCard} key={reward.id}>
                                {reward.attributes?.image ? <Image source={{ uri: (reward.attributes?.image?.data[0]?.attributes?.formats?.thumbnail.url ?? '') }} style={{ width: 100, height: 100 }} /> : null}
                                {/* {reward.attributes?.image ? <Image source={{ uri: `http://192.168.1.32:1337` + (reward.attributes && reward.attributes.image && reward.attributes.image.data && reward.attributes.image.data[0].attributes && reward.attributes.image.data[0].attributes.formats.thumbnail && reward.attributes?.image.data[0].attributes.formats.thumbnail.url ? reward.attributes?.image?.data[0]?.attributes?.formats?.thumbnail.url : '') }} style={{ width: 100, height: 100 }} /> : null} */}
                                <Text style={styles.rewardTitle}>{reward.attributes.rewardName}</Text>
                                <Text style={styles.rewardDescription}>{reward.attributes.description}</Text>
                                <Text style={styles.rewardDescription}>{reward.attributes.loyaltyPointsRequired}</Text>
                                <Pressable style={[styles.button, loyaltyPoints < reward.attributes.loyaltyPointsRequired && styles.disabled]} onPress={() => handleRequestButton(reward)} disabled={loyaltyPoints < reward.attributes.loyaltyPointsRequired}>
                                    <Text style={styles.buttonText}>Talep Et</Text>
                                </Pressable>
                                <ModalComponent ref={modalRef}>
                                    <RewardRequestModal setModalInput={setModalInput} onConfirm={(modalInput) => handleRewardRequest(modalInput)} />
                                </ModalComponent>
                            </View>
                        )
                    }) : <>
                        <View style={styles.rewardCard}>
                            <Text style={styles.rewardTitle}>Reward 1</Text>
                            <Text style={styles.rewardDescription}>Örnek detay açıklamaları</Text>
                        </View>
                        <View style={styles.rewardCard}>
                            <Text style={styles.rewardTitle}>Reward 2</Text>
                            <Text style={styles.rewardDescription}>Örnek detay açıklamaları</Text>
                        </View>
                        <View style={styles.rewardCard}>
                            <Text style={styles.rewardTitle}>Reward 3</Text>
                            <Text style={styles.rewardDescription}>Örnek detay açıklamaları</Text>
                        </View>
                        <View style={styles.rewardCard}>
                            <Text style={styles.rewardTitle}>Reward 4</Text>
                            <Text style={styles.rewardDescription}>Örnek detay açıklamaları</Text>
                        </View>
                    </>}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        height: '100%'
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#eab308'
    },
    loyaltyPoints: {
        fontSize: 18,
        marginBottom: 20,
        color: '#d97706'
    },
    rewardsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    rewardCard: {
        width: 150,
        height: 300,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#fff7ed',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eab308',
        marginBottom: 10
    },
    rewardDescription: {
        fontSize: 14,
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
    disabled: {
        opacity: 0.5,
    }
});