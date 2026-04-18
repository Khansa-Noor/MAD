import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { StudentContext } from "../context/StudentContext";
import ProfileCard from "../components/ProfileCard";

export default function SettingsScreen({ navigation }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { student, setStudent } = useContext(StudentContext);

  const isDark = theme === "dark";

  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const toggleNotifications = () => setNotifications(!notifications);
  const toggleTwoFA = () => setTwoFA(!twoFA);

  const showAboutApp = () => {
    Alert.alert(
      "About Student Portal",
      "Student Portal App\n\nVersion: 1.0.0\n\nThis app helps students manage their profile, courses, and academic progress in one place.\n\nDeveloped as a Mobile App Development project.",
      [{ text: "OK" }],
    );
  };

  const showChangePassword = () => {
    Alert.alert(
      "Change Password",
      "To change your password:\n\n1️⃣ Go to Profile Settings\n2️⃣ Enter current password\n3️⃣ Enter new password\n4️⃣ Confirm and save\n\nThis feature will be implemented in the next version.",
    );
  };

  const showLanguage = () => {
    Alert.alert(
      "Select Language",
      "Available languages:\n\n• English (Default)\n• Urdu\n• Arabic\n\nLanguage support will be added in future updates.",
    );
  };

  const showFAQ = () => {
    Alert.alert(
      "Frequently Asked Questions",
      "Q: How do I edit my profile?\nA: Go to Settings → Edit Profile.\n\nQ: How do I view courses?\nA: Use the Courses screen from Home.\n\nQ: Can I reset my data?\nA: Yes, from Settings → Reset All Data.",
    );
  };

  const showTerms = () => {
    Alert.alert(
      "Terms & Privacy",
      "This application is developed for educational purposes.\n\nYour data is stored locally on your device using secure storage.\n\nNo personal information is shared with third parties.",
    );
  };

  const contactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Need help?\n\n📧 Email: support@studentportal.com\n📞 Phone: +92 300 0000000\n\nOur support team will respond within 24 hours.",
    );
  };

  const rateApp = () => {
    Alert.alert(
      "Rate This App ⭐",
      "If you enjoy using Student Portal, please consider rating it!\n\n⭐ ⭐ ⭐ ⭐ ⭐\n\nYour feedback helps improve the app.",
    );
  };

  const logout = () => {
    setStudent(null);
    navigation.replace("Auth");
  };

  const resetData = () => {
    Alert.alert(
      "Reset Data",
      "Are you sure you want to clear all student data?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear();
            setStudent(null);
            navigation.replace("Auth");
          },
        },
      ],
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            setStudent(null);
            navigation.replace("Auth");
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f2f2f2" },
      ]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard />

      {/* Profile Management */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          Profile Management
        </Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Edit Profile
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={showChangePassword}>
          <MaterialIcons
            name="lock-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Change Password
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* App Preferences */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          App Preferences
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="moon-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Dark Mode
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={styles.row}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Notifications
          </Text>
          <Switch value={notifications} onValueChange={toggleNotifications} />
        </View>

        <TouchableOpacity style={styles.row} onPress={showLanguage}>
          <Entypo name="language" size={22} color={isDark ? "#fff" : "#000"} />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Language
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          Support & About
        </Text>

        <TouchableOpacity style={styles.row} onPress={showFAQ}>
          <Ionicons
            name="help-circle-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={showTerms}>
          <Ionicons
            name="document-text-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Terms & Privacy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={showAboutApp}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            About App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={contactSupport}>
          <Ionicons
            name="mail-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Contact Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={rateApp}>
          <Ionicons
            name="star-outline"
            size={22}
            color={isDark ? "#fff" : "#000"}
          />
          <Text style={[styles.rowText, { color: isDark ? "#fff" : "#000" }]}>
            Rate App
          </Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: isDark ? "#aaa" : "#555" }]}>
          App Version 1.0.0
        </Text>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e74c3c" }]}
          onPress={deleteAccount}
        >
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#c0552b" }]}
          onPress={logout}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f39c12" }]}
          onPress={resetData}
        >
          <Text style={styles.btnText}>Reset All Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  section: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  rowText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
  },

  button: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  version: {
    textAlign: "center",
    marginTop: 10,
  },
});
