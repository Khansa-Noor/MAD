import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { StudentContext } from "../context/StudentContext";
import ProfileCard from "../components/ProfileCard";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { student } = useContext(StudentContext);

  const isDark = theme === "dark";

  const bgColor = isDark ? "#121212" : "#f2f2f2";
  const cardColor = isDark ? "#1e1e1e" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const subText = isDark ? "#aaa" : "#555";

  // FETCH API STATE
  const [fact, setFact] = useState("");

  // FETCH FUNCTION
  const fetchTechFact = () => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then((response) => response.json())
      .then((data) => {
        setFact(data.text);
      })
      .catch((error) => console.log("Error fetching fact:", error));
  };

  // RUN ON SCREEN LOAD
  useEffect(() => {
    fetchTechFact();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: textColor }]}>
          Hello, {student?.name || "Student"} 👋
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={26} color={textColor} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, { color: subText }]}>
        Welcome back to your dashboard
      </Text>

      {/* Tech Fact Section (Fetch API) */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Fact of the Day
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={{ color: textColor, fontStyle: "italic" }}>
          {fact || "Loading tech fact..."}
        </Text>

        <TouchableOpacity style={styles.refreshButton} onPress={fetchTechFact}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.refreshText}>New Fact</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <ProfileCard />

      {/* Academic Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: "#3498db" }]}>
          <Ionicons name="bar-chart-outline" size={26} color="#fff" />
          <Text style={styles.statTitle}>GPA</Text>
          <Text style={styles.statValue}>{student?.gpa || "0.0"}</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#2ecc71" }]}>
          <Ionicons name="ribbon-outline" size={26} color="#fff" />
          <Text style={styles.statTitle}>CGPA</Text>
          <Text style={styles.statValue}>{student?.cgpa || "0.0"}</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#f1c40f" }]}>
          <Ionicons name="school-outline" size={26} color="#fff" />
          <Text style={styles.statTitle}>Semester</Text>
          <Text style={styles.statValue}>{student?.semester || "1"}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Quick Actions
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: "#2980b9" }]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="create-outline" size={26} color="#fff" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: "#27ae60" }]}
          onPress={() => navigation.navigate("Courses")}
        >
          <Ionicons name="book-outline" size={26} color="#fff" />
          <Text style={styles.actionText}>Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: "#f39c12" }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={26} color="#fff" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Class */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Upcoming Class
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.courseName, { color: textColor }]}>
          Data Structures
        </Text>
        <Text style={{ color: subText }}>10:00 AM - 11:30 AM</Text>
        <Text style={{ color: subText }}>Instructor: Prof. John Doe</Text>
      </View>

      {/* Today's Schedule */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Today's Schedule
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={{ color: textColor }}>📘 Algorithms — 12:00 PM</Text>
        <Text style={{ color: textColor }}>💻 Operating Systems — 2:00 PM</Text>
        <Text style={{ color: textColor }}>🌐 Web Development — 4:00 PM</Text>
      </View>

      {/* Notifications */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Notifications
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={{ color: textColor }}>📢 Assignment 2 due tomorrow</Text>
        <Text style={{ color: textColor }}>
          📢 Quiz scheduled for Data Structures
        </Text>
      </View>

      {/* Courses Preview */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Your Courses
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={{ color: textColor }}>📘 Data Structures</Text>
        <Text style={{ color: textColor }}>📘 Algorithms</Text>
        <Text style={{ color: textColor }}>📘 Operating Systems</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Courses")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: "#3498db", fontWeight: "bold" }}>
            View All Courses
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    marginBottom: 15,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },

  statTitle: {
    color: "#fff",
    marginTop: 5,
  },

  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionCard: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },

  actionText: {
    color: "#fff",
    marginTop: 5,
    fontWeight: "bold",
  },

  card: {
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 10,
  },

  courseName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  refreshText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
