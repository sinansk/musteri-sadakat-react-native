import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    body: {
        fontFamily: 'Roboto',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#334155',
    },
    outlineColor: {
        color: '#18181b'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: '#18181b',
        width: '100%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputLabel: {
        color: '#334155',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
        marginEnd: 'auto'
    },
    loginImage: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default globalStyles;
