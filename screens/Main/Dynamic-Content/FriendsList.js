import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from 'react-native-elements';
import * as Haptics from 'expo-haptics';

const FriendsList = () => {
  const navigation = useNavigation();
  

  const AvatarWithStatus = ({ avatarSource, emoji }) => {
    return (
      <View style={styles.avatarWithStatusContainer}>
        <Image source={avatarSource} style={styles.avatar} />
        
      </View>
    );
  };

  const FriendItem = ({ imageSource, username, emoji }) => {
    return (
      <View style={styles.friendContainer}>
        <AvatarWithStatus avatarSource={imageSource} emoji={emoji} />
        <View style={styles.friendTextContainer}>
          <Text style={styles.friendUsername}>{username}</Text>
          <Text style={styles.friendActivity}>last seen 4h ago</Text>
        </View>
        <Icon name="arrow-right-thin" size={30} color="#D6E0D9" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          placeholder="Find your Friends!"
          placeholderTextColor="#7A807C"
          returnKeyType="search"  // This sets the return key to "search"
          autoCapitalize="none"
        />
        <ScrollView style={styles.userContainer} >
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Elon Musk"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Jeff Bezos"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Bill Gates"
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
    backgroundColor: 'rgba(0, 0, 0, 0$)',
  },
  contentView: {
    marginHorizontal: 18,
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  friendTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D6E0D9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#D6E0D9',
  },
  avatarWithStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
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
