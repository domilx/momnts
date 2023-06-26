import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.loadingText}>LOADING<ActivityIndicator size="large" color="#D6E0D9" /></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#000000"
  },
  loadingText: {
    marginTop: 16,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#D6E0D9',
    textAlign: 'center'
  },
});

export default LoadingScreen;
