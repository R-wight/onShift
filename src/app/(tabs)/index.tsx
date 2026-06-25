import { Text, View, StyleSheet, Platform } from "react-native";
import {globalStyles} from "@/styles/global";
import { colors } from "@/styles/global";
import  HomeHeader  from "@/Components/homeHeader";
import { Link } from "expo-router";
//Can use ScrollView instead of view if want to scroll
export default function Index() {
  return (
    <View style={globalStyles.container}> 
      <Text style={globalStyles.title}>OnShift</Text>
      <Text style={globalStyles.paragraphs}>This is running on : {Platform.OS}</Text>
      <HomeHeader />
    </View>
  );
}

