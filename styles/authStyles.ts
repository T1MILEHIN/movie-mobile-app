import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    registerContainer: {
        padding: 20,
        justifyContent: "flex-start"
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    registerHeadline: {
        textAlign: 'center',
        marginBottom: 50,
        fontWeight: 700,
        fontStyle: 'italic'
    },
    headline: {
        textAlign: 'center',
        marginTop: -100,
        marginBottom: 50,
        fontWeight: 700,
        fontStyle: 'italic'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,

        marginTop: 10,
        marginBottom: 10,
        borderColor: "grey"
    },
    button: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
})