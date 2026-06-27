import { StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "@/styles/global";

export default function HomeHeader() {
    const currentDate = new Date().toLocaleDateString('en-US',{
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <View>
            <Text style={globalStyles.paragraphs}>Current Date: {currentDate}</Text>
        </View>
    );
}