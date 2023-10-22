import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/momnts-70b2b.appspot.com/o/profileImages%2FWZ3JiWxtUqRTl9SEN0nPOoW8bLg1?alt=media&token=ea13013a-ffa1-4646-a189-b831b452cb17";

const PostMaker = ({}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: imageUrl }} />
        {/*<Icon name="lock" size={20} color="#7A807C" style={styles.icon} /> */}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  avatarContainer: {
    flexDirection: "row",
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
    marginLeft: 10,
  },
});

export default PostMaker;
