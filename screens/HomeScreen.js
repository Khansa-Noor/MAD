import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/image1.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={[GlobalStyles.container, { backgroundColor: "rgba(0,0,0,0.5)" }]}
      >
        <Text style={[GlobalStyles.header, { color: "#fff" }]}>
          Student Dashboard
        </Text>

        <TouchableOpacity
          style={GlobalStyles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={GlobalStyles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={GlobalStyles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.button}
          onPress={() => navigation.navigate("Contact")}
        >
          <Text style={GlobalStyles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
