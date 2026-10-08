import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="cnh-form" />
      <Stack.Screen name="rg-form" />
      <Stack.Screen name="electoral-card-form" />
      <Stack.Screen name="cnh-data" />
      <Stack.Screen name="rg-data" />
      <Stack.Screen name="electoral-card-data" />
    </Stack>
  );
}
