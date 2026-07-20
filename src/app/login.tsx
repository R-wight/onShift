import {Text, View, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { useState } from "react";
import { globalStyles } from "@/styles/global";
import { credStyles } from "@/styles/login"
import { router } from "expo-router";

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View style={credStyles.container}>
            <Text style={globalStyles.title}>On<Text>Shift</Text></Text>
            <View style={credStyles.card}>
                <TextInput 
                    style={[credStyles.input, credStyles.rowInput]}
                    placeholder='Username'
                    placeholderTextColor={'#8484847b'}
                    value={userName}
                    onChangeText={setUserName}></TextInput>
                    <TextInput 
                    style={[credStyles.input, credStyles.rowInput]}
                    placeholder='Password'
                    placeholderTextColor={'#8484847b'}
                    value={password}
                    onChangeText={setPassword}></TextInput>
                <TouchableOpacity style={credStyles.button}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={credStyles.button} onPress={() => router.push("/create-account")}>
                    <Text>Create an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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