import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const WelcomeScreen = ({ navigation }) => {
  const handleBeginPress = () => {
    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View  style={styles.container}>
      <Text style={styles.title}>MOMENTS</Text>
      <Text style={styles.subtitle}>Tap the screen to get started</Text>

      <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#7A807C', position: 'absolute', bottom: 40, left: 20, right: 20 }}>domi & Nathan™</Text>



      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#D6E0D9',
    
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7A807C',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
