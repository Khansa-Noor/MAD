import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      const data = await AsyncStorage.getItem("student");
      if (data) setStudent(JSON.parse(data));
    };
    loadStudent();
  }, []);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
