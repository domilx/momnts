import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, Polyline, Callout, AnimatedRegion  } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import CustomBottomNav from './Components/CustomBottomNav';
import VerticalButtonMenu from './Components/VerticalButton';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const mapRef = useRef(null); // Create mapRef using useRef

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Blud really denied location perms');
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (currentLocation) => {
          const { latitude, longitude } = currentLocation.coords;
          setLocation(currentLocation.coords);
          setPath((prevPath) => [...prevPath, { latitude, longitude }]);
        }
      );
    };

    getLocation();
  }, []);

  const handleMarkerPress = () => {
    setIsFocused(true);
    slideToTop();
  };

  const handleCalloutPress = () => {
    setIsFocused(false);
  };


  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleCenterOnUser = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      if (location && mapRef.current) { // Check if mapRef is defined
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.log('Error getting user location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsCompass={false}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
      >
        <Polyline coordinates={path} strokeColor="#000000" strokeWidth={3} />

        {location && (
          <Marker
            onPress={handleMarkerPress}
            title="You are here"
            description="Tap for more details"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            {isFocused && (
              <Callout onPress={handleCalloutPress}>
                <Text>You are here</Text>
              </Callout>
            )}
          </Marker>
        )}
      </MapView>


      <View style={styles.controlPanelTop}>

      <MatIcon onPress={handleCenterOnUser} style={{right: 5}} name="map-marker-left-outline" size={30} color="black" />

        <TouchableOpacity onPress={handleProfile}>
          <Image source={require('./profile-image.jpg')} style={styles.Profile} />
        </TouchableOpacity>


      </View>
      
      <Animated.View style={styles.controlPanelBottom}>
        <CustomBottomNav />
      </Animated.View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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

export default MapScreen;