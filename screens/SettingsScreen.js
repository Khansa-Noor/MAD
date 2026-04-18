import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);

  return (
    <View
      style={[
        GlobalStyles.container,
        {
          backgroundColor: isDark ? "#121212" : "#f4f6f9",
          justifyContent: "center",
        },
      ]}
    >
      <View
        style={{
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          padding: 25,
          borderRadius: 15,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 20,
            color: isDark ? "#ffffff" : "#1e293b",
          }}
        >
          Appearance
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isDark ? "#ffffff" : "#334155",
            }}
          >
            Dark Mode
          </Text>

          <Switch
            value={isDark}
            onValueChange={() => setIsDark(!isDark)}
            trackColor={{ false: "#d1d5db", true: "#2563eb" }}
            thumbColor={"#ffffff"}
          />
        </View>
      </View>
    </View>
  );
}
