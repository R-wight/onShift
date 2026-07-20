import { Stack } from "expo-router";
import { colors } from "@/styles/global";
export default function RootLayout() {
  return <Stack  screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="login" />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="edit-shift" />
    <Stack.Screen name="create-account" />
  </Stack>
}
