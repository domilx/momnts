import React, { useState, useEffect } from "react";
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
import { fetchUserFeed } from "../../../services/UserFeedService";
import { getTimeAgoString } from "../../../services/PostService"
import { auth, db } from "../../../firebase";

const UserFeed = () => {
  const [showContent, setShowContent] = useState(true);
  const [userFeed, setUserFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const loggedInUserId = auth.currentUser ? auth.currentUser.uid : null;
        if (!loggedInUserId) {
          throw new Error("No user logged in.");
        }
        console.log("Logged in user ID:", loggedInUserId);
        const userFeedData = await fetchUserFeed(loggedInUserId);
        console.log("Fetched Data:", userFeedData);
        setUserFeed(userFeedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user feed:", error);
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const PostOutline = ({ username, postedImageSource, profilePicture, userlatitude, userlongitude, timeStamp }) => {
    const timeAgoString = getTimeAgoString(timeStamp);

    return (
      <View style={styles.container}>
        <View style={styles.friendContainer}>
          <View style={styles.settingChunk}>
            <TouchableOpacity
              style={styles.settingItem}
              activeOpacity={0.7}
              onPress={toggleContent}
            >
              <Image source={{ uri: profilePicture }} style={styles.avatar} />
  
              <View style={styles.twoText}>
                <Text style={styles.fullName}>{username}</Text>
                <Text style={styles.username}>{timeAgoString}</Text>
              </View>
            </TouchableOpacity>
  
            {showContent ? (
              <Image source={{ uri: postedImageSource }} style={styles.postedImage} />
            ) : (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: userlatitude,
                  longitude: userlongitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: userlatitude,
                    longitude: userlongitude,
                  }}
                />
              </MapView>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      {userFeed.map((post, index) => (
        <PostOutline
          key={index}
          username={post.username}
          profilePicture={post.profileImageUrl}
          postedImageSource={post.photoURL}
          userlatitude={post.latitude}
          userlongitude={post.longitude}
          timeStamp={post.timeStamp}
        />
      ))}
    </ScrollView>
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
  twoText: {
    justifyContent: "center",
    alignItems: "left",
    width: "83%",
    left: -10
    
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
    height: 400, 
    resizeMode: "cover",
    borderRadius: 10,
    backgroundColor: "#D6E0D9",

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

export default UserFeed;
