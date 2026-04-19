import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <View style={styles.form}>
            <TextInput
              placeholder="Enter name"
              style={styles.input}
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />

            {props.touched.name && props.errors.name && (
              <Text style={styles.error}>{props.errors.name}</Text>
            )}

            <TextInput
              placeholder="Enter email"
              style={styles.input}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
            />
            {props.touched.email && props.errors.email && (
              <Text style={styles.error}>{props.errors.email}</Text>
            )}

            <Button title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "80%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
