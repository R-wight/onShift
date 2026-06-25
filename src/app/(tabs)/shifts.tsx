import { globalStyles } from "@/styles/global";
import { View, Text} from "react-native";

export default function ShiftsScreen() {
    return (
        <View style={globalStyles.contWithHeader}>
            <Text style={globalStyles.title}>All Shifts</Text>
        </View>
    )
}