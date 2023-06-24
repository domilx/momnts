import React from 'react';
import { View, Button } from 'react-native';

const start_screen = ({ navigation }) => {

  const register_screen = () => {
    navigation.navigate('register_screen');
  };

  const login_screen = () => {
    navigation.navigate('login_screen');
  };

  const newuser_screen = () => {
    navigation.navigate('newuser_screen');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Page 1" onPress={register_screen} />
      <Button title="Go to Page 2" onPress={login_screen} />
      <Button title="Go to Page 3" onPress={newuser_screen} />
    </View>
  );
};

export default start_screen;
