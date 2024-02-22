import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { getLoyaltyPoints, getRewardRequests } from '../requestMethods';
import { TouchableOpacity } from 'react-native-gesture-handler';
const RankingScreen = () => {
    const [cafeList, setCafeList] = useState([]);
    const [rewardRequests, setRewardRequests] = useState([]);
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const userId = useSelector(state => state.user?.user?.id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLoyaltyPoints(jwt);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Response:', data);
                    const sortedList = data.data.sort((a, b) => b.attributes.pointAmount - a.attributes.pointAmount);
                    setCafeList(sortedList);
                } else {
                    console.error('Failed to fetch loyalty points:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching loyalty points:', error);
            }
        };
        const fetchRewardRequests = async () => {
            const response = await getRewardRequests(jwt);
            if (response.ok) {
                const data = await response.json();
                console.log('Reward requests:', data);
                setRewardRequests(data.data);
            } else {
                console.error('Failed to fetch reward requests:', response.statusText);
            }
        }

        fetchData();
        fetchRewardRequests()
    }, []);

    // Listede her bir öğe için render metodu
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.rank}>{index + 1}</Text>
                <Text style={styles.cafeName}>{item.attributes.user.data.attributes.username}</Text>
                <Text style={styles.points}>{item.attributes.pointAmount}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cafe Ranking</Text>
            <FlatList
                data={cafeList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#eab308'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eab308'
    },
    cafeName: {
        fontSize: 18,
    },
    points: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eab308'
    },
});

export default RankingScreen;
