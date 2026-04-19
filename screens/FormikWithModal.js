import React, { useState } from "react";
import { View, TextInput, Button, Text, Modal, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <View style={styles.container}>
      <Button title="Open Form" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Formik
            initialValues={{ name: "", email: "" }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              console.log(values);
              setModalVisible(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <TextInput
                  placeholder="Enter name"
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

                {touched.name && errors.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}

                <TextInput
                  placeholder="Enter email"
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />

                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <Button title="Submit" onPress={handleSubmit} />
                <Text>
                  ------------------------------------------------------------------------------
                </Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
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

  error: {
    color: "red",
    marginBottom: 10,
  },
});
