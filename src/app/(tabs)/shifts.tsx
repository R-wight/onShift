import { globalStyles } from "@/styles/global";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { getShifts, Shift, removeShift } from "@/storage/shifts";
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import  ShiftInfo  from '@/Components/shiftInfo'
//import DateTimePicker from '@react-native-community/datetimepicker'
//import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function ShiftsScreen() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [origShifts, setOrigShifts] = useState<Shift[]>([]); //This keeps track of only the original shifts loaded in, this should never be changed once loaded
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStartDate = (event: any, selectedDate?: Date) => {
        setShowStart(false); //Hides date picker
        if(selectedDate) {
            setDateStart(selectedDate);
        }
    }

    const onChangeEndDate = (event: any, selectedDate?: Date) => {
        setShowEnd(false); //Hides date picker
        if(selectedDate) {
            setDateEnd(selectedDate);
        }
    }

    // When the start date or end date is changed the filter will be applied
    useEffect(() => {
      console.log(dateStart.toLocaleDateString(), dateEnd.toLocaleDateString());
      const filterShifts = async () => {
      const originalShifts = origShifts;
      const filteredShifts = originalShifts.filter((shift) => shift.date >= dateStart && shift.date <= dateEnd);
      setShifts(filteredShifts);
    }
      filterShifts();
    }, [dateStart, dateEnd]);

    
    // This function removes the filter that was applied
    const clearFilter = async () => {
      setShifts(origShifts);
      setDateEnd(new Date());
      setDateStart(new Date(2026, 5, 1));
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
    parsedShifts.sort((a,b) => b.date.getTime() - a.date.getTime());
    setShifts(parsedShifts);
    setOrigShifts(parsedShifts);
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
                  //     <DateTimePicker
                  //     // startDate={dateStart}
                  //     // endDate={dateEnd}
                  //     date={dateStart}
                  //     mode="single"
                  //     //onChange={({dateStart, dateEnd}) => {setDateStart(dateStart); setDateEnd(dateEnd)}}
                  //     //onChange={onChangeStartDate}
                  // />
                  <Text>This is a test</Text>
                  )}
                  {/* <Pressable onPress={()=>setShowEnd(true)}>
                <Ionicons name="filter" size={24} color="red" />
              </Pressable>
              {showEnd && (
                      <DateTimePicker
                      value={dateEnd}
                      mode="date"
                      display="default"
                      onValueChange={onChangeEndDate}
                />
                )} */}
            </View>
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