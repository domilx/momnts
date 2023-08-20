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
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      </View>
    );
  };

  const FriendItem = ({ imageSource, username, emoji }) => {
    return (
      <View style={styles.friendContainer}>
        <AvatarWithStatus avatarSource={imageSource} emoji={emoji} />
        <Text style={styles.friendUsername}>{username}</Text>
        <Icon name="dots-horizontal" size={30} color="#D6E0D9" />
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
          keyboardType="search"
          autoCapitalize="none"
        />
        <ScrollView style={styles.userContainer} >
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username1"
            emoji="🚗"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username2"
            emoji="🛩️"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username3"
            emoji="🛥️"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username4"
            emoji="🚗"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username5"
            
            emoji="🚗"
          />
          <View style={styles.divider} />
          <FriendItem
            imageSource={require('../profile-image.jpg')}
            username="Username6"
            emoji="🚗"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  contentView: {
    marginHorizontal: 18,
  },
  friendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    position: 'relative',
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
  emojiContainer: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: 'black',
    borderRadius: 30,
    borderColor: "#D6E0D9",
    borderWidth: 0.2,
    padding: 4,
  },
});

export default FriendsList;
