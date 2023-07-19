import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const navigation = useNavigation();


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

  const handleControlButtonPress = () => {
    // Handle control button press
    console.log('Control button pressed');
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Image source={require('./profile-image.jpg')} style={styles.avatar} />
          </Marker>
        )}
      </MapView>

      <View style={styles.controlPanelTop}>
        <TouchableOpacity  onPress={handleProfile}>
          <Image source={require('./profile-image.jpg')} style={styles.Profile} />
        </TouchableOpacity>
      </View>
      

      <View style={styles.controlPanelBottom}>
        <TouchableOpacity>
      <Icon name="arrow-top-right-thin-circle-outline" size={40} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton} onPress={handleControlButtonPress}>
          <Text style={styles.controlButtonText}>add to your journey test</Text>
        </TouchableOpacity>

        
      </View>


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
    borderColor: "grey",
    borderRadius: 50,
  },
  controlPanelTop: {
    position: 'absolute',
    top: 60,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  controlPanelBottom: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    
  },
  controlButton: {
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 7,
    marginRight:7
  },
  controlButtonText: {
    color: '#D6E0D9',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default MapScreen;
