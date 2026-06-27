import { ScheduleLocalNotificationDetails, StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "@/styles/global";
import { Shift } from "@/storage/shifts";
import ShiftItem from "./shiftItem";

type ShiftInfoProps = {
    shifts: Shift[];
}

export default function ShiftInfo({ shifts }: ShiftInfoProps) {
    return (
        <View style={{ marginTop: 30 }}>
            <Text style={globalStyles.paragraphs}>Past Shifts</Text>
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