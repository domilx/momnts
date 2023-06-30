import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {

  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);

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

  return (

    <View style={styles.container}>

      {location && (

        <MapView style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          }}>

          <Polyline coordinates={path} strokeColor="#000000" strokeWidth={3}/>

          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>

            <Image source={require('./profile-image.jpg')} style={styles.avatar}/>

          </Marker>
        </MapView>
      )}
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
});

export default MapScreen;
