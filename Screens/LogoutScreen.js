import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
const LogoutScreen = () => {
    const modalRef = useRef();
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.userSlice?.user?.jwt);
    const handleLogout = () => {
        dispatch(clearUser())
        navigation.navigate('Login');
    }

    const handleCancel = () => {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <Image source={require('../assets/door.png')} style={styles.doorImage} />
            <Text style={styles.title}>Are you sure you want to log out ?</Text>
            <View style={styles.buttons}>
                <Pressable onPress={handleLogout} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </Pressable>
                <Pressable onPress={handleCancel} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Cancel</Text>
                </Pressable>
            </View>
        </View >
    )
}

export default LogoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        margin: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    doorImage: {
        width: 200,
        height: 200,
        marginBottom: 20
    }
})