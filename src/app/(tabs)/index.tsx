// TODO: Need to add styling for the shift info components, shouldn't be in the center?
import { Text, View, StyleSheet, Platform } from "react-native";
import {globalStyles} from "@/styles/global";
import { colors } from "@/styles/global";
import  HomeHeader  from "@/Components/homeHeader";
import { Link } from "expo-router";
import { getShifts, Shift } from "@/storage/shifts";
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'
// useFocusEffect is used to update the shifts when switching between tabs
// It loads the shifts whenever the home screen comes into focus
//Can use ScrollView instead of view if want to scroll
export default function Index() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  const loadShifts = async () => {
    const data = await getShifts();
    setShifts(data);
    console.log("loaded meals: ", shifts);
  } 

  useFocusEffect(
    useCallback( () => {
      loadShifts();
    }, []),
  );

  return (
    <View style={globalStyles.container}> 
      <Text style={globalStyles.title}>OnShift</Text>
      <HomeHeader />
      {/* Should maybe have the Past Two weeks in the shift info component, maybe I can pass in a title
      so it can have different titles */}
      <Text style={globalStyles.paragraphs}>Past Two Weeks:</Text>
      <ShiftInfo shifts={shifts} />
    </View>
  );
}

