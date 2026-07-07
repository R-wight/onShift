import { StyleSheet, Text, View } from "react-native";
import { globalStyles, colors } from "@/styles/global";
import { LinearGradient } from 'expo-linear-gradient';
type StatsProps = {
    payDay: Date,
    totalHours: number,

}

export default function HomeStatistics({payDay, totalHours}: StatsProps){
    const currentDate = new Date().toLocaleDateString('en-US',{
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    return(
        
        <View style={styles.container}>
            <LinearGradient colors={['#2563EB','#06B6D4']} style={styles.linearGradient}>
                <View style={styles.leftContainer}>
                    <Text style={styles.hourText}><Text style={styles.hourNumber}>{totalHours}</Text> Hrs</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={globalStyles.paragraphs}>Pay Day: {payDay ? payDay.toLocaleDateString('en-US',{
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                }) : "Error"}</Text>
                    <Text style={globalStyles.paragraphs}>Current Date: {currentDate}</Text>
                </View>
            </LinearGradient>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#2a4eb0',
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        height: 120,
        alignItems: 'center',
        // flex: 1,
        // justifyContent:'space-between',
        // flexDirection: 'row',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.65)',
    },
    linearGradient: {
        width: '95%',
        borderRadius: 15,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftContainer: {
        borderRightWidth: 2,
        borderRightColor: "black",
        paddingRight: 35,
        // flexDirection: 'row',
    },
    rightContainer: {
        marginLeft: 10
    },
    hourNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    hourText: {
        color: 'white',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    }

})