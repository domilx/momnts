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
import MapView, { Marker } from "react-native-maps";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from "react-native-elements";
import * as Haptics from "expo-haptics";

const Places = () => {
  const navigation = useNavigation();
  const [showContent, setShowImage] = useState(true);

  const toggleContent = () => {
    setShowImage(!showContent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.placesTab}>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentView: {
    marginHorizontal: 20,
  },
  placesTab: {
    flexDirection: "row",
  },
  twoText: {
    justifyContent: "center",
    alignItems: "left",
    width: "80%",

    marginLeft: 10,
  },
  map: {
    width: "100%",
    height: 400,
    borderRadius: 10,
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
    marginRight: 10,
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
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  avatarWithStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
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
  postedImage: {
    width: "100%",
    height: 400, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 10,
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

export default Places;
