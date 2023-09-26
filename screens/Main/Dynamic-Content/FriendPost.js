import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from 'react-native-elements';
import * as Haptics from 'expo-haptics';

const FriendsList = () => {
  const navigation = useNavigation();
  

  const FriendItem = ({ avatarSource, username, emoji, postedImageSource }) => {
    return (
      <View style={styles.Container}>
        <View style={styles.friendContainer}>
          <View style={styles.settingChunk}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} >
              <Image
                source={avatarSource}
                style={styles.avatar}
              />
              <View style={styles.twoText}>
                <Text style={styles.fullName}>{username}</Text>
                <Text style={styles.username}>last seen 4h ago</Text>
              </View>
              <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
            </TouchableOpacity>
            {/* User-posted image */}
            <Image
              source={postedImageSource}
              style={styles.postedImage}
            />
          </View>
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <FriendItem
          avatarSource={require('../profile-image.jpg')}
          username="Aly Shariff"
          postedImageSource={require('../Sample/2.jpg')} // Specify the user's posted image source here
        />
          <View style={styles.divider} />
          <FriendItem
          avatarSource={require('../profile-image.jpg')}
          postedImageSource={require('../Sample/1.jpg')} // Specify the user's posted image source here

          username="Xin Lei"
          />
          <View style={styles.divider} />
          <FriendItem
          avatarSource={require('../profile-image.jpg')}
          username="Bill Gates"
            postedImageSource={require('../Sample/3.jpg')} // Specify the user's posted image source here

          />
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
    alignItems: 'center',
  },
  contentView: {
    marginHorizontal: 18,
  },
  twoText: {
    justifyContent: 'center',
    alignItems: 'left',
    width: "80%",

    marginLeft: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7A807C',
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
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
},
settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,  // Applied consistent padding to the entire settingItem
},
  avatarWithStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
  },
  friendUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  friendActivity: {
    fontSize: 10,
    color: '#7A807C',
  },
  postedImage: {
    width: '100%',
    height: 400, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 10,
  },
  emojiContainer: {
    marginLeft: 5,
    backgroundColor: 'black',
    borderRadius: 30,
    borderColor: "#D6E0D9",
    borderWidth: 0.2,
    padding: 4,
  },
});

export default FriendsList;
