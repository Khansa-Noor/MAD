import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ThemeContext } from "../context/ThemeContext";

import NotesScreen from "../screens/NotesScreen";
import MovieScreen from "../screens/MovieScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const theme = isDark ? darkTheme : lightTheme;

  const logout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTintColor: theme.text,

        tabBarStyle: {
          backgroundColor: theme.header,
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#38bdf8",
        tabBarInactiveTintColor: "#94a3b8",

        headerRight: () => (
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={22}
                color="#38bdf8"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={logout} style={styles.iconBtn}>
              <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Movies"
        component={MovieScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: "row",
    marginRight: 10,
  },

  iconBtn: {
    marginLeft: 12,
    padding: 6,
  },
});

const darkTheme = {
  header: "#0f172a",
  text: "#ffffff",
};

const lightTheme = {
  header: "#ffffff",
  text: "#0f172a",
};
