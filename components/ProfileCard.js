import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { StudentContext } from "../context/StudentContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileCard() {
  const { student } = useContext(StudentContext);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <View
      style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
    >
      <Image
        source={{
          uri:
            student?.image ||
            "https://cdn-icons-png.flaticon.com/128/3135/3135789.png",
        }}
        style={styles.image}
      />

      <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>
        {student?.name || "Student Name"}
      </Text>

      <Text style={[styles.email, { color: isDark ? "#aaa" : "#555" }]}>
        {student?.email || "student@email.com"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 4,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    fontSize: 14,
  },
});
