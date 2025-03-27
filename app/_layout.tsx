import { Stack } from "expo-router";
import "./globals.css";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false}}
        />
    </Stack>
  )
}
