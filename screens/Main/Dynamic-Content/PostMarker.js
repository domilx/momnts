import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PostMarker = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/momnts-70b2b.appspot.com/o/profileImages%2FWZ3JiWxtUqRTl9SEN0nPOoW8bLg1?alt=media&token=ea13013a-ffa1-4646-a189-b831b452cb17";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={toggleModal}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <View
            style={{
              borderColor: "rgba(21, 21, 23, 0.7)",
              borderWidth: 5,
              borderRadius: 50,
            }}
          >
            <Image style={styles.avatar} source={{ uri: imageUrl }} />
          </View>

          <View
            style={{
              backgroundColor: "rgba(21, 21, 23, 0.7)",
              borderColor: "rgba(21, 21, 23, 0.0)",
              borderWidth: 5,
              borderRadius: 50,
            }}
          >
            <Text style={styles.sectionHeading}>
              nathanaruna
              <Icon
                name="chevron-right"
                size={15}
                color="gray"
              />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/*

      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Hello! I am a modal!</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderColor: "rgba(21, 21, 23, 0.1)",
    borderWidth: 1,
  },
  icon: {
    position: "absolute",
    right: -5,
    bottom: -5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fdfdff",
    paddingHorizontal: 5,
  },
  closeButton: {
    marginTop: 100,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default PostMarker;
