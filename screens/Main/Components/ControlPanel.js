import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, Polyline, Callout, AnimatedRegion  } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ControlPanel = () => {
  
  const handleProfile = () => {
    navigation.navigate('Profile');
  };


  return (

      <View >

      <MatIcon onPress={handleCenterOnUser} style={{right: 5}} name="map-marker-left-outline" size={30} color="black" />

        <TouchableOpacity onPress={handleProfile}>
          <Image source={require('../profile-image.jpg')} style={styles.Profile} />
        </TouchableOpacity>


      </View>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  Profile: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 50,
  },
  controlPanelTop: {
    position: 'absolute',
    top: 40,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  controlPanelBottom: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlButton: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 7,
    marginRight: 7,
  },
  controlButtonText: {
    color: '#D6E0D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ControlPanel;