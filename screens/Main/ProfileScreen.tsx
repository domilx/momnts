import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import AntIcon from "react-native-vector-icons/AntDesign";
import UserService from "../../services/UserService";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [friendsCount, setFriendsCount] = useState(0); // New state for friends count


  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("EditProfile");
  };

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const userProfile = await UserService.getUserProfile();
      if (userProfile) {
        setProfile(userProfile);
        try {
          const count = await UserService.getFriendsCount(userProfile.userId);
          setFriendsCount(count);
        } catch (error) {
          console.error("Error retrieving friends count:", error);
        }
      }
    };

    loadUserProfile();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleReturn}
        style={styles.returnIcon}
      >
        <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          paddingTop: 15,
          color: "#D6E0D9",
          fontWeight: "bold",
          justifyContent: "center",
        }}
      >
        Profile
      </Text>

      <TouchableOpacity
        style={styles.settingsIcon}
        activeOpacity={0.8}
        onPress={handleSettings}
      >
        <Icon name="dots-horizontal" size={30} color="#D6E0D9" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: profile.profileImageUrl }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleEditProfile}
          style={styles.nameContainer}
        >
          <View style={styles.namesIcon}>
            <Text style={styles.displayname}>{profile.fullName}</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.usernameText}>@{profile.username}</Text>
          </View>
          <View style={styles.username}>
            <Text style={styles.bioText}>"{profile.bio}"</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.settingChunk}>
        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.twoText}>
            <Text style={styles.fullName}>MOMNTS | SCORE</Text>
            <Text style={styles.score}>1 023 812</Text>
          </View>
          <View style={styles.twoText}>
            <Text style={styles.fullName}>FRIENDS</Text>
            <Text style={styles.score}>{friendsCount}</Text>
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
  fullName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#D6E0D9",
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
  twoText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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
  score: {
    fontSize: 13,
    color: "#7A807C",
    fontWeight: 500,
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
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
    width: "90%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    alignItems: "center",
    paddingVertical: 10,
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  label: {
    fontSize: 14,
    color: "#7A807C",
    fontWeight: "bold",
  },
  verticaldivider: {
    width: 0.6,
    height: 40,
    backgroundColor: "#D6E0D9",
    marginHorizontal: 10,
  },
  nameContainer: {
    alignItems: "center",
  },
  usernameText: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: "600",
  },

  settingChunk: {
    backgroundColor: "#151517",
    width: "90%",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 11, // Applied consistent padding to the entire settingItem
  },
});

export default ProfileScreen;
