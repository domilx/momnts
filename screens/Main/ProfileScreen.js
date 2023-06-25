import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Avatar, Text, Button } from '@ui-kitten/components';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={require('./background-image.jpg')}
      >
        <Avatar style={styles.avatar} source={require('./profile-image.jpg')} />
        <Text style={styles.name} category="h4">
          Daddy Nathan
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle} category="h6">
          About Me
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed ultrices sagittis neque a iaculis.
        </Text>

        <Button appearance='outline' style={styles.editButton}>Edit Profile</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  editButton: {
    alignSelf: 'center',
  },
});

export default ProfileScreen;
