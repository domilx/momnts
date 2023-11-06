import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import UserCard from "./Dynamic-Content/UserCard";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, ListItem } from "react-native-elements";
import SearchService from "../../services/SearchService";
import FriendsService from "../../services/FriendsService";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearch(query);

    clearTimeout(timeoutId);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await SearchService.searchUsers(query);
        setSearchResults(results);
        console.log("Search Results:", searchResults);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }, 300);
  };

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleFriends = () => {
    navigation.navigate("Friends");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleProfile = () => {
    navigation.navigate("UserProfile");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleReturn}>
          <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleFriends}>
          <MatIcon name="account-group" size={28} color="#D6E0D9" />
        </TouchableOpacity>
      </View>

      <View style={styles.settingChunk}>
        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <Icon name="magnify" size={25} color="gray" style={styles.arrow} />

          <View style={styles.twoText}>
            <TextInput
              style={[styles.input, { color: "#D6E0D9" }]}
              placeholder="Search for your friends"
              keyboardAppearance="dark"
              placeholderTextColor="#7A807C"
              onChangeText={handleSearch}
              value={search}
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
      <ScrollView
        style={styles.toggleContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserCard user={item} userCard={handleProfile} />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 18,
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    resizeMode: "cover",
    marginVertical: 5,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  input: {
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  toggleContainer: {
    flex: 1,
  },
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
    paddingHorizontal: 10,
    paddingVertical: 11,
  },
  sectionHeading: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#fdfdff",
    marginLeft: 10,
  },
  chunkTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4e4e4e",
    marginTop: 20,
  },
  divider: {
    height: 0.3,
    backgroundColor: "#29292b",
  },
  iconLeft: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  arrow: {
    marginRight: 5,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: "#151517",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#7A807C",
    top: 250,
  },
});

export default SettingsScreen;
