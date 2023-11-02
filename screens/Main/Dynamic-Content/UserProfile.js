import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import AntIcon from "react-native-vector-icons/AntDesign";

const UserProfile = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReturn} activeOpacity={1} style={styles.returnIcon}>
        <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
      </TouchableOpacity>

      


      <View style={styles.header}>
        <Image
          style={styles.avatar}
          
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.nameContainer}>
          <View style={styles.namesIcon}>
            <Text style={styles.displayname}>Nathan Aruna</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.usernameText}>@nathanaruna</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.bioText}>love planes so so much </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: 40,
  },
  settingsIcon: {
    position: "absolute",
    top: 52,
    right: 20,
    zIndex: 1,
  },
  returnIcon: {
    position: "absolute",
    top: 52,
    left: 20,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingTop: 80,
  },
  namesIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: "#7A807C",
  },
  displayname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 5,
  },
  username: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  bioText: {
    fontSize: 16,
    color: "#7A807C",
    fontStyle: "italic",
    justifyContent: "center",
    alignItems: "center",
  },
  
  nameContainer: {
    alignItems: "center",
  },
  usernameText: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: "600",
  },
});

export default UserProfile;
