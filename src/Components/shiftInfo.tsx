import {  Text, View, ViewStyle, StyleSheet, Alert } from "react-native";
import { globalStyles, colors } from "@/styles/global";
import { Shift } from "@/storage/shifts";
import ShiftItem from "./shiftItem";
import { removeShift } from "@/storage/shifts";
import { router } from "expo-router";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';


type ShiftInfoProps = {
    shifts: Shift[];
    title: string;
    // Can pass in styles so the component can be used differently on different pages
    custStyles: ViewStyle;
    cardStyle: ViewStyle;
    onDelete: (id: string) => Promise<void>;
}

export default function ShiftInfo({ shifts, title, custStyles, cardStyle, onDelete }: ShiftInfoProps) {
    const handleDelete = async(name: string, id: string) => {
        Alert.alert(name + "","Are you sure you want to delete this shift", [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => onDelete(id) },
        ]);
    }
    const handleEdit = (shift: Shift) => {
        console.log(shift.id);
        router.push({
            pathname: "/edit-shift", 
            params: {
                currentShift: shift.id
            }});
    }
    return (
        //<MenuProvider>
            <View>
                {title ? (
                <Text style={[globalStyles.paragraphs, {alignSelf: "center"}]}>{title}</Text>
                        ) : null}
                <View style={custStyles}> 
                    {shifts.length === 0 ? (
                        <Text style={globalStyles.paragraphs}>No shifts logged yet</Text>
                    ) : (
                        shifts
                            .slice(0,shifts.length)
                            .map((shift) => (
                                <View style={cardStyle} key={shift.id}>
                                <Menu renderer={renderers.Popover}>
                                    <MenuTrigger triggerOnLongPress={true} style={styles.triggerBox}>
                                        <ShiftItem
                                        key={shift.id}
                                        name={shift.name}
                                        date={new Date(shift.date)}
                                        startTime={new Date(shift.startTime)}
                                        endTime={new Date(shift.endTime)}
                                        cardWidth={{width: "100%"}} />
                                    </MenuTrigger>    
                                    <MenuOptions customStyles={optionsStyles}>
                                        <MenuOption onSelect={ () => {handleEdit(shift)}} text={"Edit"} />
                                        <MenuOption onSelect={ () => {handleDelete(shift.date.toLocaleDateString(), shift.id)}} text={"Delete"} />
                                    </MenuOptions>
                                </Menu>
                                </View>
                            ))
                    )}
                </View>
            </View>
        //</MenuProvider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  triggerBox: {
    //padding: 20,
    //backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  triggerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  test: {
    marginTop: 10,
    marginLeft: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10
  }
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 8,
    width: 150,
  },
  optionText: {
    color: '#333333',
    padding: 10,
    fontSize: 16,
  },
};
