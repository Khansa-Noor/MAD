// App.js
import React from "react";
import { StudentProvider } from "./context/StudentContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  // Load the font
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StudentProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </StudentProvider>
    </ThemeProvider>
  );
}
