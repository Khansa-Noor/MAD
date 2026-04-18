import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const courses = [
  {
    id: "1",
    name: "Data Structures",
    time: "Mon 10-12",
    instructor: "Dr. Ahmed",
  },
  { id: "2", name: "Algorithms", time: "Tue 2-4", instructor: "Dr. Ali" },
  {
    id: "3",
    name: "Operating Systems",
    time: "Wed 11-1",
    instructor: "Dr. Khan",
  },
  { id: "4", name: "Databases", time: "Thu 9-11", instructor: "Dr. Fatima" },
  { id: "5", name: "Networking", time: "Fri 1-3", instructor: "Dr. Bilal" },
  { id: "6", name: "AI Fundamentals", time: "Mon 3-5", instructor: "Dr. Sara" },
  {
    id: "7",
    name: "Software Engineering",
    time: "Tue 10-12",
    instructor: "Dr. Hassan",
  },
];

export default function CoursesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const bgColor = isDark ? "#121212" : "#f2f2f2";
  const cardColor = isDark ? "#1e1e1e" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const subTextColor = isDark ? "#aaaaaa" : "#555";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={() => navigation.navigate("CourseDetail", { course: item })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="book-outline" size={28} color="#fff" />
      </View>

      <View style={styles.courseInfo}>
        <Text style={[styles.courseName, { color: textColor }]}>
          {item.name}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={subTextColor} />
          <Text style={[styles.infoText, { color: subTextColor }]}>
            {item.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color={subTextColor} />
          <Text style={[styles.infoText, { color: subTextColor }]}>
            {item.instructor}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={22} color={subTextColor} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Text style={[styles.title, { color: textColor }]}>Enrolled Courses</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  iconContainer: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  infoText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
