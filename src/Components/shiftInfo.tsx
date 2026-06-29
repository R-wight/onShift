import { ScheduleLocalNotificationDetails, StyleSheet, Text, View, ViewStyle } from "react-native";
import { globalStyles, colors } from "@/styles/global";
import { Shift } from "@/storage/shifts";
import ShiftItem from "./shiftItem";

type ShiftInfoProps = {
    shifts: Shift[];
    title: string;
    // Can pass in styles so the component can be used differently on different pages
    custStyles: ViewStyle;
}

export default function ShiftInfo({ shifts, title, custStyles }: ShiftInfoProps) {
    return (
        // <View style={{ marginTop: 30, display:"flex", flexDirection:"row", gap:10, flexWrap: "wrap" }}>
        <View style={custStyles}>
            <Text style={globalStyles.paragraphs}>{title}</Text>
            {shifts.length === 0 ? (
                <Text style={globalStyles.paragraphs}>No shifts logged yet</Text>
            ) : (
                shifts
                    .slice(0,4)
                    .map((shift) => (
                        <ShiftItem
                        key={shift.id}
                        name={shift.name}
                        date={new Date(shift.date)}
                        startTime={new Date(shift.startTime)}
                        endTime={new Date(shift.endTime)} />
                    ))
            )}
        </View>
    );
}