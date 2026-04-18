import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentContext } from "../context/StudentContext";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons"; // icons

export default function AuthScreen({ navigation }) {
  const { setStudent } = useContext(StudentContext);
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Signup
  const signup = async () => {
    if (!email || !password) return alert("Please fill all fields");
    if (!isValidEmail(email)) return alert("Please enter a valid email");

    const newStudent = {
      name: "Student Name",
      sap: "12345",
      semester: "5",
      gpa: "3.5",
      cgpa: "3.4",
      email,
      password, // store password for login check
    };

    try {
      await AsyncStorage.setItem("student", JSON.stringify(newStudent));
      setStudent(newStudent);
      navigation.replace("MainTabs");
    } catch (e) {
      console.log(e);
      alert("Signup failed. Try again.");
    }
  };

  // Login
  const login = async () => {
    if (!email || !password) return alert("Please fill all fields");
    if (!isValidEmail(email)) return alert("Please enter a valid email");

    try {
      const data = await AsyncStorage.getItem("student");
      if (!data) return alert("No account found. Please signup first.");

      const studentData = JSON.parse(data);
      if (studentData.email === email && studentData.password === password) {
        setStudent(studentData);
        navigation.replace("MainTabs");
      } else {
        alert("Invalid email or password.");
      }
    } catch (e) {
      console.log(e);
      alert("Login failed. Try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/back.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? "#121212aa" : "#ffffffaa" },
        ]}
      >
        <Text
          style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}
        >
          Student Portal
        </Text>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={theme === "dark" ? "#fff" : "#555"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#555"}
            style={[
              styles.input,
              {
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={theme === "dark" ? "#fff" : "#555"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#555"}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.loginBtn,
            { backgroundColor: theme === "dark" ? "#2980b9" : "#3498db" },
          ]}
          onPress={login}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.signupBtn,
            { backgroundColor: theme === "dark" ? "#27ae60" : "#2ecc71" },
          ]}
          onPress={signup}
        >
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "center" },
  container: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    justifyContent: "center",
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "Poppins-Bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginBtn: { padding: 12, borderRadius: 10, marginTop: 10 },
  signupBtn: { padding: 12, borderRadius: 10, marginTop: 10 },
  btnText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
});
