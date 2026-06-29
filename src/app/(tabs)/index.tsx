// TODO: Need to add styling for the shift info components, shouldn't be in the center?
import { Text, ScrollView, StyleSheet, Platform, View } from "react-native";
import {globalStyles} from "@/styles/global";
import { colors } from "@/styles/global";
import  HomeHeader  from "@/Components/homeHeader";
import { Link } from "expo-router";
import { getShifts, Shift } from "@/storage/shifts";
import { useCallback, useState, useMemo } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'
// useFocusEffect is used to update the shifts when switching between tabs
// It loads the shifts whenever the home screen comes into focus
//Can use ScrollView instead of view if want to scroll

export default function Index() {
//   const [payDay, setPayDay] = useState<Date | null>(null); //new Date(2026, 5, 19);
//   useEffect( () =>  {
//     const initialPayDay = new Date(2026, 5, 19);
//     const currDate = new Date();
    
//     while(currDate > initialPayDay){
//       initialPayDay.setDate(initialPayDay.getDate() + 14);
//     }
//     setPayDay(initialPayDay);
// });

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
    startPayPeriod.setDate(startPayPeriod.getDate() - 21);
    startPayPeriod.setHours(0,0,0,0);
    if(newShift.date <= cutOffDate && newShift.date >= startPayPeriod){
      parsedShifts.push(newShift);
    }
        
    }
    console.log(parsedShifts)
    parsedShifts.sort((a,b) => b.date.getTime() - a.date.getTime());
    setShifts(parsedShifts);
  } 

  useFocusEffect(
    useCallback( () => {
      loadShifts();
    }, []),
  );


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
      <ShiftInfo shifts={shifts} title={"Current Pay Period"} custStyles={styles.shifts} cardStyle={styles.cardStyle}/>
      </ScrollView>
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
  }
});