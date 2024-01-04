import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  NunitoSans_800ExtraBold,
  NunitoSans_300Light,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";
import { useColorScheme } from "react-native";
import axios from "axios";

import Home from "./src/screens/Home";
import { StatusBar } from "expo-status-bar";
import Details from "./src/screens/Details";

export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = useColorScheme();
  let [fontsLoaded, fontError] = useFonts({
    NunitoSans_800ExtraBold,
    NunitoSans_300Light,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: "hsl(209, 23%, 22%)",
      text: "hsl(0, 0%, 100%)",
      background: "hsl(207, 26%, 17%)",
      border: "hsl(209, 23%, 22%)",
    },
  };
  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      card: "hsl(0, 0%, 100%)",
      text: "hsl(200, 15%, 8%)",
      background: "hsl(0, 0%, 98%)",
      border: "hsl(0, 0%, 52%)",
    },
  };
  axios.defaults.baseURL = "https://restcountries.com/v3.1";

  return (
    <NavigationContainer
      theme={theme === "dark" ? customDarkTheme : customDefaultTheme}
    >
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
