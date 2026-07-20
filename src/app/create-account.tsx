import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { useState } from "react";
import { credStyles } from "@/styles/login";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";

export default function CreateAccount(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    return(
        <View style={credStyles.container}>
            <Text style={globalStyles.title}>On<Text>Shift</Text></Text>
            <View style={credStyles.card}>
                <Text>Create a new account!</Text>
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
                    <TextInput 
                    style={[credStyles.input, credStyles.rowInput]}
                    placeholder='Confirm Password'
                    placeholderTextColor={'#8484847b'}
                    value={confPassword}
                    onChangeText={setConfPassword}></TextInput>
                <TouchableOpacity style={credStyles.button} onPress={() => router.push("/(tabs)")}>
                    <Text>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="link" onPress={() => router.push("/login")}>
                    <Text style={styles.link}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        textDecorationColor: 'blue',
        marginTop: 15,
        alignSelf: 'center'
    }
})