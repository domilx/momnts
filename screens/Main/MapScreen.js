import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { BottomSheet } from './Components/BottomSheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import FriendsList from './Dynamic-Content/FriendsList';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState('noview');
  const [path, setPath] = useState([]);
  const navigation = useNavigation();
  const mapRef = useRef(null); 

  const handleButtonXPress = () => {
    setCurrentView('xView');
    setShow(true);
  };

  const handleButtonYPress = () => {
    setCurrentView('yView');
    setShow(true);
  };

  const handleCenterButtonClick = () => {
    navigation.navigate("CameraView");
  };

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied for location');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setPath([currentLocation.coords]);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideNav} onPress={() => navigation.navigate("Profile")}>
        <Image style={styles.avatar} source={require("./profile-image.jpg")} />
      </TouchableOpacity>

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
            title="You are here"
            description="Tap for more details"
            coordinate={location}
          />
        )}
      </MapView>

      <BottomSheet show={show} onOuterClick={() => setShow(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleButtonXPress} style={styles.navItem}>
              <MatIcon name="account-group" size={35} color="#D6E0D9" />
              <Text style={styles.name}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCenterButtonClick} style={styles.circleButton}>
              <MatIcon name="plus" size={40} color="#D6E0D9" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleButtonYPress} style={styles.navItem}>
              <MatIcon name="sign-direction" size={35} color="#D6E0D9" />
              <Text style={styles.name}>Journeys</Text>
            </TouchableOpacity>
          </View>
          {currentView === 'noview' && (
            <Text style={styles.infoText}>noview</Text>
          )}
          {currentView === 'xView' && (
            <View style={styles.friendsListContainer}>
              <FriendsList />
            </View>
          )}
          {currentView === 'yView' && (
            <Text style={styles.infoText}>Button "Y" was pressed</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sideNav: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoText: {
    color: "white",
  },
  name: {
    fontSize: 13,
    color: '#D6E0D9',
    fontWeight: 'bold',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 2,
    borderColor: '#D6E0D9',
    borderRadius: 40,
  },
  friendsListContainer: {
    marginTop: 90,
  }
});

export default MapScreen;
