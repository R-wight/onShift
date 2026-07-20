import {StyleSheet} from "react-native";

export const credStyles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(2, 84, 84, 0.61)",
        flex: 1,
    },
    card:{
        backgroundColor: 'grey',
        margin: 'auto',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        padding: 50,
        width: '75%'
    },
    button: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 75,
        alignItems: 'center',
        marginTop: 24,
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