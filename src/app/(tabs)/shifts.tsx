import { globalStyles } from "@/styles/global";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { getShifts, Shift, removeShift } from "@/storage/shifts";
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ShiftsScreen() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStartDate = (event: any, selectedDate?: Date) => {
        setShowStart(false); //Hides date picker
        if(selectedDate) {
            setDateStart(selectedDate);
            setShowEnd(true);
        }
    }

    const onChangeEndDate = (event: any, selectedDate?: Date) => {
        setShowEnd(false); //Hides date picker
        if(selectedDate) {
            setDateEnd(selectedDate);
            console.log(dateStart.toLocaleDateString(), dateEnd.toLocaleDateString());
            //clearFilter();
            filterShifts();
        }
    }

    const filterShifts = () => {
      setShifts(shifts.filter((shift) => shift.date >= dateStart && shift.date <= dateEnd));
    }

    const clearFilter = async () => {
      await loadShifts();
    }

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
            <Text style={[globalStyles.title]}>All Shifts</Text>
            <View style={styles.filter}>
              <Pressable onPress={()=>clearFilter()}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
              <Pressable onPress={()=>setShowStart(true)}>
                <Ionicons name="filter" size={24} color="white" />
              </Pressable>
              {showStart && (
                      <DateTimePicker
                      value={dateStart}
                      mode="date"
                      display="default"
                      onChange={onChangeStartDate}
                  />
                  )}
              {showEnd && (
                      <DateTimePicker
                      value={dateEnd}
                      mode="date"
                      display="default"
                      onChange={onChangeEndDate}
                />
                )}
            </View>
            {/* <View style={styles.dateContainer}>
              <Pressable style={[styles.rowInput]} onPress={()=>setShow(true)}>
                <Text style={globalStyles.paragraphs}>Start Date</Text>
                <Text style={styles.input}>{dateStart.toLocaleDateString()}</Text>
              </Pressable>
              {show && (
                      <DateTimePicker
                      value={dateStart}
                      mode="date"
                      display="default"
                      onChange={onChangeStartDate}
                  />
                  )}
              <Pressable style={[styles.rowInput]} onPress={()=>setShow(true)}>
                <Text style={globalStyles.paragraphs}>End Date</Text>
                <Text style={styles.input}>{dateEnd.toLocaleDateString()}</Text>
              </Pressable>
              {show && (
                      <DateTimePicker
                      value={dateEnd}
                      mode="date"
                      display="default"
                      onChange={onChangeEndDate}
                  />
                  )}
            </View> */}
            <ScrollView style={{flex: 1}}>
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
  },
  rowInput: {
    width: '45%',
    height: '100%',
    marginTop: 5,
  },
  input: {
    backgroundColor: '#2a2a4a',
    color: '#ffffff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
    marginBottom: 15
  },
  filter: {
    alignItems: 'flex-end',
    marginRight: 20,
    flexWrap: 'nowrap'
  }
});