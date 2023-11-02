import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const UserCard = ({ user, userCard }) => {
  const handleUserCard = () => {
    userCard(user.id); 
  };
  return (
    <View style={styles.settingChunk}>
      <TouchableOpacity style={styles.settingItem} onPress={handleUserCard} activeOpacity={0.7}>
        <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
        <View style={styles.twoText}>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
        <Icon
          name="account-plus-outline"
          size={25}
          color="#D6E0D9"
          style={styles.arrow}
        />
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
