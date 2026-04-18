import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetailScreen({ route }) {
  const { course } = route.params;
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const bgColor = isDark ? "#121212" : "#f2f2f2";
  const cardColor = isDark ? "#1e1e1e" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const subText = isDark ? "#bbbbbb" : "#555";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header Banner */}
      <View style={styles.banner}>
        <Ionicons name="book-outline" size={60} color="#fff" />
        <Text style={styles.bannerTitle}>{course.name}</Text>
      </View>

      {/* Course Info Card */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color="#3498db" />
          <Text style={[styles.infoText, { color: textColor }]}>
            {course.time}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color="#3498db" />
          <Text style={[styles.infoText, { color: textColor }]}>
            Instructor: {course.instructor || "Dr. John Doe"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="school-outline" size={20} color="#3498db" />
          <Text style={[styles.infoText, { color: textColor }]}>
            Credits: 3
          </Text>
        </View>
      </View>

      {/* Description Card */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Course Description
        </Text>

        <Text style={[styles.description, { color: subText }]}>
          This course covers the fundamental concepts of {course.name}. Students
          will explore theory, practical implementations, and real-world
          applications to build a strong understanding of the subject.
        </Text>
      </View>

      {/* Instructor Card */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Instructor
        </Text>

        <View style={styles.row}>
          <Ionicons name="person-circle-outline" size={40} color="#3498db" />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.instructorName, { color: textColor }]}>
              {course.instructor || "Dr. John Doe"}
            </Text>
            <Text style={{ color: subText }}>Professor, Computer Science</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  banner: {
    backgroundColor: "#3498db",
    padding: 30,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
  },

  instructorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
