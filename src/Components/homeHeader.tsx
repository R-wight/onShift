import { StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "@/styles/global";

export default function HomeHeader() {
    const currentDate = new Date().toLocaleDateString('en-US',{
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <View style={{marginBottom: 10}}>
            <Text style={globalStyles.paragraphs}>Current Date: {currentDate}</Text>
        </View>
    );
}