import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { sendFriendRequest } from "../../../services/FriendsService"; // Import the function from your service file
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

const UserCard = ({ user, userCard }) => {
  const [addIndicator, setaddIndicator] = useState(false);
  const navigation = useNavigation();

  const handleSendFriendRequest = async () => {
    try {
      const userId = getUserIdFromDocumentId(user);
      if (userId) {
        await sendFriendRequest(userId);
        setaddIndicator(!addIndicator);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.success);
      } else {
        console.error("User ID not found");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleProfile = async () => {
    navigation.navigate("UserProfile", { user })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
  };

  // PLEASE FIX ITS TAKING THE PROFILE URL LINK AND EXTRACTING USER ID SO NOT HALAL MODE
  const getUserIdFromDocumentId = (user) => {
    const profileImageUrl = user.profileImageUrl || "";
    const userId = profileImageUrl.split("%2F")[1].split("?")[0];
    return userId;
  };

  return (
    <View style={styles.settingChunk}>
      <TouchableOpacity
        onPress={handleProfile}
      >
        <View style={styles.settingItem} activeOpacity={0.7}>
          <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
          <View style={styles.twoText}>
            <Text style={styles.fullName}>{user.fullName}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>

          <TouchableOpacity onPress={handleSendFriendRequest}>
            <Icon
              name={addIndicator ? "account-remove" : "account-plus"}
              size={25}
              color={addIndicator ? "#7A807C" : "#D6E0D9"}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingChunk: {
    backgroundColor: "#151517",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 60,
    resizeMode: "cover",
    marginVertical: 5,
    backgroundColor: "#7A807C",
  },
  twoText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    marginLeft: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7A807C",
  },
});

export default UserCard;
