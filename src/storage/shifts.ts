import AsyncStorage from "@react-native-async-storage/async-storage";

export type Shift = {
    id: string;
    name: string;
    date: Date;
    startTime: Date;
    endTime: Date;
};

const SHIFTS_KEY = 'shifts';

export const getShifts = async (): Promise<Shift[]> => {
    const data = await AsyncStorage.getItem(SHIFTS_KEY);
    // console.log("From Storage", data);
    return data ? JSON.parse(data) : [];
};

export const addShift = async(
    shift: Omit<Shift, 'id'>,
): Promise<Shift> => {
    const shifts = await getShifts();
    const newShift: Shift = {
        ...shift,
        id: Date.now().toString()
    };
    await AsyncStorage.setItem(SHIFTS_KEY, JSON.stringify([newShift, ...shifts]));
    return newShift;
};