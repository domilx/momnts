import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.returnIcon}>
            <Icon name="arrow-left-thin" size={40} color="#D6E0D9" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.8} onPress={handleSettings}>
        <Icon name="dots-horizontal" size={40} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image style={styles.avatar} source={require("./profile-image.jpg")} />
        <TouchableOpacity activeOpacity={0.8} onPress={handleEditProfile}>
          <View style={styles.namesIcon}>
            <Text style={styles.displayname}>Nathan Aruna</Text>
          </View>
          <View style={styles.username}>
          <Text style={styles.username}>@nate282</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Additional profile info can be added here */}
      <Text style={styles.username}>user post and info here</Text>

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
  },
  displayname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginRight: 5,
  },
  username: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
    width: "90%",
  },
});

export default ProfileScreen;
