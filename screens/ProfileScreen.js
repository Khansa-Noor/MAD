import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>Student Profile</Text>

      <View style={GlobalStyles.card}>
        {/* Profile Image from Online URL */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1726710856076-dcf34775ab93?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://i.pravatar.cc/150?img=3",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />

        <TextInput
          style={GlobalStyles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={GlobalStyles.input}
          placeholder="Age"
          keyboardType="numeric"
          inputMode="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
      </View>
    </View>
  );
}
