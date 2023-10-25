import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from "react-native-elements";
import * as Haptics from "expo-haptics";

const FriendsList = () => {
  const navigation = useNavigation();

  const FriendItem = ({ imageSource, username, emoji }) => {
    return (
      <View style={styles.Container}>
        <View style={styles.friendContainer}>
          <View style={styles.settingChunk}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Image style={styles.avatar} />
              <View style={styles.twoText}>
                <Text style={styles.fullName}>{username}</Text>
                <Text style={styles.username}>last seen 4h ago</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.settingChunk}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Icon name="magnify" size={25} color="gray" style={styles.arrow} />

            <View style={styles.twoText}>
              <TextInput
                style={[styles.input, { color: "#D6E0D9" }]}
                placeholder="See what your friends are up to..."
                placeholderTextColor="#7A807C"
              />
            </View>
            <Icon
              name="chevron-right"
              size={25}
              color="gray"
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.userContainer}>
          <View style={styles.divider} />
          {/* Add more FriendItem components here */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0$)",
  },
  contentView: {
    marginHorizontal: 18,
  },
  twoText: {
    justifyContent: "center",
    alignItems: "left",
    width: "80%",

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
  friendContainer: {
    flex: 1,
  },
  arrow: {
    marginRight: 5,
  },
  friendTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  settingChunk: {
    backgroundColor: "#151517",
    borderRadius: 10,
    marginTop: 3,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 11, // Applied consistent padding to the entire settingItem
  },
  avatarWithStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
    backgroundColor: "#7A807C",
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
  },
  friendUsername: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  friendActivity: {
    fontSize: 10,
    color: "#7A807C",
  },
  emojiContainer: {
    marginLeft: 5,
    backgroundColor: "black",
    borderRadius: 30,
    borderColor: "#D6E0D9",
    borderWidth: 0.2,
    padding: 4,
  },
});

export default FriendsList;
