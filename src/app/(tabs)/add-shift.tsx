import { globalStyles } from "@/styles/global";
import { useState } from 'react';
import { 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    View,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import { addShift } from "@/storage/shifts";
import { Ionicons } from "@expo/vector-icons";

export default function AddShiftsScreen() {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showTimeStart, setShowTimeStart] = useState(false);
    const [timeStart, setTimeStart] = useState(new Date());
    const [showTimeEnd, setShowTimeEnd] = useState(false);
    const [timeEnd, setTimeEnd] = useState(new Date());
    
    // Need to add the addShift method here, and do some validation, check if end date is before start date
    const handleAddShift = () => {
        console.log({name, date, timeStart});
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShow(false); //Hides date picker
        if(selectedDate) {
            setDate(selectedDate);
        }
    }
    const onChangeTime = (event: any, selectedTime?: Date) => {
        setShowTimeStart(false); //Hides time picker
        if(selectedTime) {
            setTimeStart(selectedTime);
        }
    }
    const onChangeTimeEnd = (event: any, selectedTime?: Date) => {
        setShowTimeEnd(false); //Hides time picker
        if(selectedTime) {
            setTimeEnd(selectedTime);
        }
    }
    return (
        // Should maybe change this style so it isn't just all in the middle
        <View style={globalStyles.contWithHeader}>
            <Text style={globalStyles.title}>New Shift</Text>
            <View style={styles.row}>
                <Text style={[globalStyles.paragraphs, globalStyles.label]}>Job Name</Text>
                <TextInput
                    style={[styles.input, styles.rowInput]}
                    placeholder='Job Name'
                    placeholderTextColor={'#8484847b'}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            {/* Can add style to pressable or change style of the text */}
            <View style={styles.row}>
                <Text style={[globalStyles.label, globalStyles.paragraphs]}>Shift Date</Text>
                <Pressable style={[styles.rowInput]} onPress={()=>setShow(true)}> 
                    <Text style={styles.input}>{date.toLocaleDateString()}</Text>
                </Pressable>
                {show && (
                    <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
                )}
            </View>
            <View style={styles.row}>
                <Text style={[globalStyles.label, globalStyles.paragraphs]}>Start Time</Text>
                <Pressable style={styles.rowInput} onPress={()=>setShowTimeStart(true)}> 
                    <Text style={styles.input}>{timeStart.toLocaleTimeString('en-US', {timeStyle:'short'})}</Text>
                </Pressable>
                {showTimeStart && (
                    <DateTimePicker
                    value={timeStart}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                />
                )}
            </View>
            <View style={styles.row}>
                <Text style={[globalStyles.label, globalStyles.paragraphs]}>End Time</Text>
                <Pressable style={styles.rowInput} onPress={()=>setShowTimeEnd(true)}> 
                    <Text style={styles.input}>{timeEnd.toLocaleTimeString('en-US', {timeStyle:'short'})}</Text>
                </Pressable>
                {showTimeEnd && (
                    <DateTimePicker
                    value={timeEnd}
                    mode="time"
                    display="default"
                    onChange={onChangeTimeEnd}
                />
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddShift}>
                <Text style={styles.buttonText}>Add Shift</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#2a2a4a',
    color: '#ffffff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 5,
  },
  row: {
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 10
  },
  rowInput: {
    width: '90%',
    height: 75,
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#4fc3f7',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
    width: '90%'
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputBox: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 }
});