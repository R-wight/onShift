import { StyleSheet, Text, View} from 'react-native';

type ShiftItemProps = {
    name: string;
    date: Date;
    startTime: Date;
    endTime: Date;
}

export default function ShiftItem({
  name,
  date,
  startTime,
  endTime
}: ShiftItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>{date.toLocaleDateString()}</Text>
      <Text style={styles.macros}>{startTime.toLocaleTimeString()}</Text>
      <Text style={styles.macros}>{endTime.toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    // width: "30%"
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  macros: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
  },
});