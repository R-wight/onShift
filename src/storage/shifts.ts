import AsyncStorage from "@react-native-async-storage/async-storage";

export type Shift = {
    id: string;
    name: string;
    date: Date;
    startTime: Date;
    endTime: Date;
};

const SHIFTS_KEY = 'shifts';
const ONSHIFT_KEY = 'onshift';
const STARTTIME_KEY = 'starttime';
const ENDTIME_KEY = 'endtime';

export const getShifts = async (): Promise<Shift[]> => {
    const data = await AsyncStorage.getItem(SHIFTS_KEY);
    // console.log("From Storage", data);
    return data ? JSON.parse(data) : [];
};

export const getSpecificShift = async (id: string|string[]): Promise<Shift | null> => {
    const shifts = await getShifts();
    const currentShift = shifts.find((shift) => shift.id === id);
    return currentShift ? currentShift : null;
}

export const editShift = async(id: string|string[], editedShift: Omit<Shift, 'id'>): Promise<void> => {
    const currentShift = await getSpecificShift(id);
    if(currentShift === null){
        return;
    }
    const shifts = await getShifts();
    shifts.forEach((shift) => {
        if(currentShift.id === shift.id){
            shift.name = editedShift.name;
            shift.date = editedShift.date;
            shift.startTime = editedShift.startTime;
            shift.endTime = editedShift.endTime;
        }
    })
    await AsyncStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
}

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

export const toggleShift = async(): Promise<boolean> => {
    if(await isOnShift()){
        await AsyncStorage.setItem(ONSHIFT_KEY, JSON.stringify(false));
        return false;
    }
    await AsyncStorage.setItem(ONSHIFT_KEY, JSON.stringify(true));
    return true;
}

export const isOnShift = async(): Promise<boolean> => {
    const data = await AsyncStorage.getItem(ONSHIFT_KEY);
    if(data === "true"){
        return true;
    }
    return false;
}

export const startShift = async(): Promise<void> => {
    await AsyncStorage.setItem(STARTTIME_KEY, JSON.stringify((new Date()).getTime()));
    await AsyncStorage.setItem(ONSHIFT_KEY, JSON.stringify(true));
    return;
}

export const endShift = async(): Promise<void> => {
    const currentDate = new Date();
    const start = await AsyncStorage.getItem(STARTTIME_KEY);
    await AsyncStorage.setItem(ONSHIFT_KEY, JSON.stringify(false));
    if(!start){
        return;
    }
    const startTime = new Date(parseFloat(start));
    await addShift({
            name: "Job",
            date: currentDate,
            startTime: startTime,
            endTime: currentDate
        });
    await AsyncStorage.removeItem(STARTTIME_KEY);
    
    return;
}

export const removeShift = async(id: string): Promise<Shift[]> => {
    const data = await getShifts();
    const updatedShifts = data.filter((shift) => shift.id !== id);
    await AsyncStorage.setItem(SHIFTS_KEY, JSON.stringify(updatedShifts));
    return updatedShifts;
}