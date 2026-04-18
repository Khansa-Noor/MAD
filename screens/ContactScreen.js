import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function ContactScreen() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim() === "") {
      Alert.alert("Please enter your email");
    } else {
      Alert.alert("Message Sent Successfully");
      setEmail("");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>Contact Administration</Text>

      <View style={GlobalStyles.card}>
        {/* Email Input with Icon */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <MaterialIcons
            name="email"
            size={22}
            color="#415789"
            style={{ marginRight: 8 }}
          />

          <TextInput
            style={{ flex: 1, height: 45 }}
            placeholder="Enter your email"
            keyboardType="email-address"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
          <Text style={GlobalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
