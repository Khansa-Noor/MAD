import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const tabBarStyle = {
    backgroundColor: isDark ? "#1e1e1e" : "#fff",
    borderTopColor: isDark ? "#333" : "#ddd",
    height: 60,
    paddingBottom: 5,
  };

  const activeTintColor = "#3498db";
  const inactiveTintColor = isDark ? "#aaa" : "#555";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Courses")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Settings")
            iconName = focused ? "settings" : "settings-outline";

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 3 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
