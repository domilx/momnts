import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import AntIcon from "react-native-vector-icons/AntDesign";

const UserProfile = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleForeignProfileSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleReturn}
        activeOpacity={1}
        style={styles.returnIcon}
      >
        <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleForeignProfileSettings}
        activeOpacity={1}
        style={styles.settingsIcon}
      >
        <Icon name="dots-horizontal" size={30} color="#D6E0D9" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: user.profileImageUrl }} />
        <TouchableOpacity activeOpacity={0.8} style={styles.nameContainer}>
          <View style={styles.namesIcon}>
            <Text style={styles.displayname}>{user.fullName}</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.usernameText}>@{user.username}</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.bioText}>"{user.bio}"</Text>
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
