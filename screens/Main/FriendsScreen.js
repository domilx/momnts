import React from 'react';
import { View, StyleSheet } from 'react-native';

const Friends = () => {
  const user = {
    name: 'NathanAruna',
    avatar: 'https://avatars.githubusercontent.com/u/88948653?v=4', // Replace this with the user's actual avatar URL
  };

  const post = {
    content: 'real ahh jitiune hogalatuga caus!',
  };

  const location = {
    latitude: 37.78825, // Replace with the actual latitude value
    longitude: -122.4324, // Replace with the actual longitude value
  };

  return (
    <View style={styles.container}>
      <FriendsPost user={user} post={post} location={location} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Friends;
