import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
     
    >
      <View>
        <Text style={styles.title}>MOMENTS</Text>
        <Text style={styles.subtitle}>Loading... <ActivityIndicator size="small" color="#D6E0D9" /></Text>
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#7A807C',
          position: 'absolute',
          bottom: 40,
          left: 20,
          right: 20,
        }}
      >
        domi & Nathan™
      </Text>
    </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7A807C',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
