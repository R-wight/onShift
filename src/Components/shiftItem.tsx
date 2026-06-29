import { StyleSheet, Text, View, ViewStyle} from 'react-native';

type ShiftItemProps = {
    name: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    cardWidth: ViewStyle;
}

export default function ShiftItem({
  name,
  date,
  startTime,
  endTime,
  cardWidth
}: ShiftItemProps) {
  return (
    <View style={[styles.container, cardWidth]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>{date.toLocaleDateString('en-US',{
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    })}</Text>
      <Text style={styles.macros}>{startTime.toLocaleTimeString('en-US', {timeStyle:'short'})}</Text>
      <Text style={styles.macros}>{endTime.toLocaleTimeString('en-US', {timeStyle:'short'})}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: "31%",
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