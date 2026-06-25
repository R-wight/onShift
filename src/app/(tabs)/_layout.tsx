import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';


export default function TabLayout(){
    return(
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#3d3f64',
                borderTopColor: '#3d0674',
            },
            tabBarActiveTintColor: '#0787fe',
            tabBarInactiveTintColor: '#929090'
        }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='home' size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='add-shift'
                options={{
                    title: 'Add Shift',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='add-circle' size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='shifts'
                options={{
                    title: 'All Shifts',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='list' size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}