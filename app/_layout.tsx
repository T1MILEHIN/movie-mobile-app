import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false}}
          />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false}}
          />
      </Stack>
    </>
  )
}
