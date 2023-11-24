import React, { useState, useEffect } from "react";
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
import { getSentFriendRequests } from "../../services/FriendsService";
import { getReceivedFriendRequests } from "../../services/FriendsService";
import { getFriends } from "../../services/FriendsService"; 
import { auth, db } from "../../firebase";

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('friends'); // Possible values: 'friends', 'sent', 'received'
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


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

  const handleBlockedUsers = () => {
    navigation.navigate("BlockedUsers");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const friendsList = await getFriends(userId);
        const sent = await getSentFriendRequests(userId);
        const received = await getReceivedFriendRequests(userId);

        setFriends(friendsList);
        setSentRequests(sent);
        setReceivedRequests(received);
        // Initially display friends
        setFilteredData(friendsList);
      }
    };
    // Assume we have a function to get the current user's incoming friend requests
    const fetchIncomingRequests = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const requests = await getSentFriendRequests(userId);
        setReceivedRequests(requests);
      }
    };

    let data = [];
    if (activeTab === 'friends') {
      data = friends;
    } else if (activeTab === 'sent') {
      data = sentRequests;
    } else if (activeTab === 'received') {
      data = receivedRequests;
    }

    if (search) {
      data = data.filter((item) =>
        item.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(data);
    fetchData();
    fetchIncomingRequests();
  }, [search, activeTab, friends, sentRequests, receivedRequests]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearch(''); // Clear search when changing tabs
  };

  const acceptRequest = async (senderId) => {
    try {
      await FriendsService.acceptFriendRequest(senderId);
      // Refresh the list of incoming requests
      const updatedRequests = incomingRequests.filter(req => req.senderId !== senderId);
      setIncomingRequests(updatedRequests);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleReturn}>
          <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
        </TouchableOpacity>
        <Text style={styles.title}>MOMNTS</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleBlockedUsers}>
          <MatIcon name="account-off-outline" size={28} color="#D6E0D9" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => handleTabChange('friends')}>
          <Text style={styles.tab}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('sent')}>
          <Text style={styles.tab}>Sent Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('received')}>
          <Text style={styles.tab}>Received Requests</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <UserCard user={item} />}
      />
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
  filterButton: {
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },

});

export default FriendsScreen;
