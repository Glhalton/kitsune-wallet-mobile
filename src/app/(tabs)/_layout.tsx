import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Home" }}
        />
        <Stack.Screen
          name="information"
          options={{ headerShown: true, title: "Information" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
