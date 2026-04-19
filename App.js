import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import styles from "./styles/GlobalStyling";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>This is my simple Modal Practice</Text>

      <Button title="open Modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible}>
        <View style={styles.Container}>
          <Text style={styles.text}>This is a modal popup!</Text>

          <Button
            style={styles.button}
            title="Close Modal"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
