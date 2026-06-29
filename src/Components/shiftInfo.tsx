import {  Text, View, ViewStyle } from "react-native";
import { globalStyles, colors } from "@/styles/global";
import { Shift } from "@/storage/shifts";
import ShiftItem from "./shiftItem";

type ShiftInfoProps = {
    shifts: Shift[];
    title: string;
    // Can pass in styles so the component can be used differently on different pages
    custStyles: ViewStyle;
    cardStyle: ViewStyle;
}

export default function ShiftInfo({ shifts, title, custStyles, cardStyle }: ShiftInfoProps) {
    return (
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
                            <ShiftItem
                            key={shift.id}
                            name={shift.name}
                            date={new Date(shift.date)}
                            startTime={new Date(shift.startTime)}
                            endTime={new Date(shift.endTime)}
                            cardWidth={cardStyle} />
                        ))
                )}
            </View>
        </View>
    );
}