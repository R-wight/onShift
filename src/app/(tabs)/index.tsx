// TODO: Need to add styling for the shift info components, shouldn't be in the center?
import { Text, ScrollView, StyleSheet, Platform, View, TouchableOpacity } from "react-native";
import {globalStyles} from "@/styles/global";
import { colors } from "@/styles/global";
import  HomeHeader  from "@/Components/homeHeader";
import { Link } from "expo-router";
import { getShifts, Shift, isOnShift, toggleShift, startShift, endShift, removeShift } from "@/storage/shifts";
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'
import * as Clipboard from 'expo-clipboard';

// useFocusEffect is used to update the shifts when switching between tabs
// It loads the shifts whenever the home screen comes into focus
//Can use ScrollView instead of view if want to scroll

export default function Index() {

  // this function finds the next pay day to display on screen and to give a filter to the
  // shown past shifts
const payDay = useMemo(() => {
  const nextPayDay = new Date(2026, 5, 19);
  const currDate = new Date();
  while (currDate > nextPayDay) {
    nextPayDay.setDate(nextPayDay.getDate() + 14);
  }
  return nextPayDay;
}, []);

  const [shifts, setShifts] = useState<Shift[]>([]);

  const loadShifts = async () => {
    const data = await getShifts();
    let parsedShifts: Shift[] = [];
    
    for(let i = 0; i < data.length; i++){
        // Need to create new dates because storage stores the dates as strings
      let newShift: Shift = {
        id: data[i].id,
        name: data[i].name,
        date: new Date(data[i].date),
        startTime: new Date(data[i].startTime),
        endTime: new Date(data[i].endTime)
      }
      const cutOffDate = new Date(payDay);
      cutOffDate.setDate(cutOffDate.getDate() - 6)
      cutOffDate.setHours(0,0,0,0);
      const startPayPeriod = new Date(payDay);
      startPayPeriod.setDate(startPayPeriod.getDate() - 20); //20 so the last day isn't included
      startPayPeriod.setHours(0,0,0,0);
      if(newShift.date <= cutOffDate && newShift.date >= startPayPeriod){
        parsedShifts.push(newShift);
      }   
    }
    parsedShifts.sort((a,b) => b.date.getTime() - a.date.getTime());
    setShifts(parsedShifts);
  } 
  const copyPast2Weeks= async() => {
    let shiftString = "";
    shifts.forEach( (shift) => {
      shiftString += "Job Name: " + shift.name + " - " + shift.date.toLocaleDateString('en-US',{
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }) + " " + shift.startTime.toLocaleTimeString('en-US', {timeStyle:'short'}) + " - " + shift.endTime.toLocaleTimeString('en-US', {timeStyle:'short'}) + "\n";
    } )
    await Clipboard.setStringAsync(shiftString);
  }

  useFocusEffect(
    useCallback( () => {
      loadShifts();
    }, []),
  );

  const [onShift, setOnShift] = useState<boolean>();

  const checkOnShift = async() => {
    const data = await isOnShift();
    console.log("Initial", data);
    setOnShift(data);
  }
  useFocusEffect(
    useCallback( () => {
      checkOnShift();
    }, []),
  );

  async function handleStartEndShift(){
    if(onShift){
      // end the shift and save the shift
      await endShift();
      setOnShift(false)
      return;
    }
    // start the shift and save the start time
    await startShift();
    setOnShift(true);
  }

  const handleDeleteShift = async(id: string) => {
    await removeShift(id);
    loadShifts();
  }

  return (
    <View style={globalStyles.contWithHeader}>
    
      <Text style={globalStyles.title}>OnShift</Text>
      <Text style={globalStyles.paragraphs}>Pay Day: {payDay ? payDay.toLocaleDateString('en-US',{
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }) : "Error"}</Text>
      <HomeHeader />
      <ScrollView style={{width: "100%"}} contentContainerStyle={{alignItems: "center"}} > 
        <TouchableOpacity style={styles.button} onPress={handleStartEndShift}>
          <Text style={styles.buttonText}>{onShift ? "End Shift" : "Start Shift"}</Text>
        </TouchableOpacity>
        <ShiftInfo shifts={shifts}
          title={"Current Pay Period"}
          custStyles={styles.shifts} 
          cardStyle={styles.cardStyle} 
          onDelete={handleDeleteShift}/>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={copyPast2Weeks}>
        <Text style={styles.buttonText}>Copy Past Two Weeks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shifts: {
    marginTop: 10,
    marginLeft: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10
  },
  cardStyle: {
    width: "45%",
  },
  button: {
    backgroundColor: '#4fc3f7',
    padding: 16,
    borderRadius: 75,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
    width: '50%'
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});