import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{course.name}</Text>

      <Text style={styles.time}>{course.time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  time: {
    marginTop: 5,
  },
});
