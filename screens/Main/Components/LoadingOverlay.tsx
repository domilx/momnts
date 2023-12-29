import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const OverlayComponent = ({ isVisible, onClose }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size="small" color="#D6E0D9" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7A807C",
    textAlign: "center",
  },
  overlayContent: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
});

export default OverlayComponent;
