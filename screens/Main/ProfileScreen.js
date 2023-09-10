import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from 'expo-haptics';
import AntIcon from "react-native-vector-icons/AntDesign";


const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.navigate("EditProfile");
  };

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.returnIcon}>
        <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
      </TouchableOpacity>

      <Text style={{fontSize: 20, paddingTop: 15, color: "#D6E0D9", fontWeight: "bold", justifyContent: "center",}}>Profile</Text>

      <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.8} onPress={handleSettings}>
        <Icon name="dots-horizontal" size={30} color="#D6E0D9" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image style={styles.avatar} source={require("./profile-image.jpg")} />
        <TouchableOpacity activeOpacity={0.8} onPress={handleEditProfile} style={styles.nameContainer}>
          <View style={styles.namesIcon}>
            <Text style={styles.displayname}>Nathan Aruna</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.usernameText}>@nate282</Text>
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
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
    width: "90%",
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#D6E0D9"
  },
  label: {
    fontSize: 14,
    color: '#7A807C',
    fontWeight: 'bold',
  },
  verticaldivider: {
    width: 0.6,
    height: 40,
    backgroundColor: '#D6E0D9',
    marginHorizontal: 10,
  },
  nameContainer: {
    alignItems: "center",
  },
  usernameText: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: '600',  

  },
});

export default ProfileScreen;
