import AsyncStorage from "@react-native-async-storage/async-storage";

export type Account = {
    id: string,
    userName: string,
    password: string,
};

const ACCOUNTS_KEY = 'accounts';

// Get all accounts
export const getAccounts = async (): Promise<Account[]> => {
    const data = await AsyncStorage.getItem(ACCOUNTS_KEY);
    return data ? JSON.parse(data) : [];
}

// export const getAccount = async (userName: string): Promise<Account | null> => {
//     const accounts = await getAccounts();
//     const account =  accounts.filter((account) => account.userName === userName);
//     return account;
// }