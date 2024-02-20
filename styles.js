import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#18181b',
        color: '#334155',
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
        color: '#18181b'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export default globalStyles;
