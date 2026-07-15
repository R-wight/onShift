import { StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

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
      <Text style={styles.times}>{startTime.toLocaleTimeString('en-US', {timeStyle:'short'})} - </Text>
      <Text style={styles.times}>{endTime.toLocaleTimeString('en-US', {timeStyle:'short'})}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftColor: 'green',
    borderLeftWidth: 3,
    backgroundColor: '#12151e',
    borderRadius: 10,
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    width: undefined
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    width: '100%'
  },
  macros: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
    borderRightWidth: 1,
    borderRightColor: 'white',
    marginRight: 10,
    paddingRight: 10
  },
  times:{
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4
  }
});