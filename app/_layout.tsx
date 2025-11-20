import { Stack } from "expo-router";
// 1. Import your colors
import { COLORS } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        // 2. Use the variable instead of hardcoded string
        headerStyle: {
          backgroundColor: COLORS.primary, 
        },
        headerTintColor: COLORS.surface, // White text on the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // This sets the background color for ALL screens
        contentStyle: {
          backgroundColor: COLORS.background, 
        }
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Mental Math' }} />
      <Stack.Screen name="train/index" options={{ title: 'Select Mode' }} />
      <Stack.Screen name="learn/index" options={{ title: 'Learn Tables' }} />
    </Stack>
  );
}