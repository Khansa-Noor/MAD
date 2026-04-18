import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert, // <- import Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentContext } from "../context/StudentContext";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen({ navigation }) {
  const { student, setStudent } = useContext(StudentContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState(student?.name || "");
  const [semester, setSemester] = useState(student?.semester || "");
  const [gpa, setGpa] = useState(student?.gpa || "");
  const [cgpa, setCgpa] = useState(student?.cgpa || "");
  const [profileImage, setProfileImage] = useState(student?.image || "");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    const updatedStudent = {
      ...student,
      name,
      semester,
      gpa,
      cgpa,
      image: profileImage,
    };

    await AsyncStorage.setItem("student", JSON.stringify(updatedStudent));
    setStudent(updatedStudent);

    // Show alert after profile update
    Alert.alert("Profile updated successfully ✔");

    navigation.goBack();
  };

  const isDark = theme === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f5f6fa" },
      ]}
    >
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri:
                profileImage ||
                "https://cdn-icons-png.flaticon.com/128/3135/3135789.png",
            }}
            style={styles.profileImage}
          />

          {/* Change Image Button */}
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.title, { color: isDark ? "#fff" : "#2c3e50" }]}>
          Edit Profile
        </Text>
      </View>

      {/* Form Card */}
      <View
        style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
      >
        {/* Name */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <TextInput
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Semester */}
        <View style={styles.inputContainer}>
          <Ionicons name="school-outline" size={20} color="#888" />
          <TextInput
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
            placeholder="Semester"
            placeholderTextColor="#888"
            value={semester}
            onChangeText={setSemester}
          />
        </View>

        {/* GPA */}
        <View style={styles.inputContainer}>
          <Ionicons name="stats-chart-outline" size={20} color="#888" />
          <TextInput
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
            placeholder="GPA"
            placeholderTextColor="#888"
            value={gpa}
            onChangeText={setGpa}
            keyboardType="numeric"
          />
        </View>

        {/* CGPA */}
        <View style={styles.inputContainer}>
          <Ionicons name="analytics-outline" size={20} color="#888" />
          <TextInput
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
            placeholder="CGPA"
            placeholderTextColor="#888"
            value={cgpa}
            onChangeText={setCgpa}
            keyboardType="numeric"
          />
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.button} onPress={updateProfile}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
