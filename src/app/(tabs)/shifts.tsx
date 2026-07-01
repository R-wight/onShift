import { globalStyles } from "@/styles/global";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { getShifts, Shift, removeShift } from "@/storage/shifts";
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'

export default function ShiftsScreen() {
    const [shifts, setShifts] = useState<Shift[]>([]);

    // This function gets all the shifts from storage, creates new Shift objects 
    // and adds them to an array so that it can be sorted from newest shifts to oldest
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
        parsedShifts.push(newShift)
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
  const handleDeleteShift = async(id: string) => {
      await removeShift(id);
      loadShifts();
    };
    return (
        <View style={styles.container}>
            <Text style={[globalStyles.title, {textAlign: "center"}]}>All Shifts</Text>
            <ScrollView>
                <ShiftInfo 
                shifts={shifts} 
                title={""} 
                custStyles={styles.shifts} 
                cardStyle={styles.cardStyle}
                onDelete={handleDeleteShift}/>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  shifts: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  cardStyle: {
    width: "31%"
  }
});