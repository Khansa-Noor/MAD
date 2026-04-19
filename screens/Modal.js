import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text> </Text>
      <Text> </Text>
      <Text> This is my simple Modal Practice</Text>
      <Text>
        --------------------------------------------------------------------------------------------------
      </Text>

      <Button title="open Modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible}>
        <View>
          <Text>This is a modal popup!</Text>
          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
