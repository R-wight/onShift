import {StyleSheet} from "react-native";

export const credStyles = StyleSheet.create({
    container: {
        backgroundColor: "#064E2B",
        flex: 1,
    },
    card:{
        backgroundColor: '#F8E7C9',
        margin: 'auto',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        padding: 50,
        width: '75%'
    },
    button: {
        backgroundColor: '#064E2B',
        padding: 16,
        borderRadius: 75,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        padding: 16,
        borderRadius: 10,
        fontSize: 16,
        marginTop: 5,
    },
    rowInput: {
        marginTop: 5,
        marginBottom: 5
    },
});