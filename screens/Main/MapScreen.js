import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { BottomSheet } from './Components/BottomSheet';
import ControlPanel from './Components/ControlPanel';
import ControlPanel2 from './Components/ControlPanel2';
import FriendsList from './Dynamic-Content/FriendsList';
import { debounce } from 'lodash';

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState('noview');
  const [path, setPath] = useState([]);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [city, setCity] = useState("Montreal");  // Initialized to Montreal by default

  const fetchCityName = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();

        // Extract the city name without any additional details
        let cityName = data.city || data.locality || data.principalSubdivision || "";

        // Handle cases where we get additional details like "(administrative region)"
        cityName = cityName.split("(")[0].trim();

        return cityName;
    } catch (error) {
        console.error("Error fetching city name:", error);
        return null; // Return null on error
    }
};


  const debouncedFetchCityName = debounce(async (region) => {
    const cityName = await fetchCityName(region.latitude, region.longitude);
    setCity(cityName);
  }, 2000);


  const handleButtonXPress = () => {
    setCurrentView('xView');
    setShow(true);
    setIsComponentVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleButtonYPress = () => {
    setCurrentView('yView');
    setIsComponentVisible(false);
    setShow(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleCenterButtonClick = () => {
    navigation.navigate('CameraView');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onOuterClick = () => {
    setShow(false);
    setIsComponentVisible(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCurrentView('noview');
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
      <View style={styles.topNav}>
      {isComponentVisible && (

         <ControlPanel2 cityName={city} />

        )}
      </View>
      <View style={styles.sideNav}>
        
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image style={styles.avatar} source={require('./profile-image.jpg')} />
        </TouchableOpacity>
        {isComponentVisible && (
        <ControlPanel />
        )}
      </View>
      <MapView
        ref={mapRef}
        onRegionChangeComplete={debouncedFetchCityName}
        style={styles.map}
        showsCompass={false}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}>
        <Polyline coordinates={path} strokeColor="#000000" strokeWidth={3} />
        {location && (
          <Marker
            title="You are here"
            description="Tap for more details"
            coordinate={location}
          />
        )}
      </MapView>
      <BottomSheet show={show} onOuterClick={onOuterClick}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleButtonXPress}
              style={styles.navItem}>
              <MatIcon name="account-group" size={35} color="#D6E0D9" />
              <Text style={styles.name}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleCenterButtonClick}
              style={styles.circleButton}>
              <MatIcon name="plus" size={40} color="#D6E0D9" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleButtonYPress}
              style={styles.navItem}>
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
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    right: 10,
    zIndex: 1,
  },
  topNav: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 60,
    width: '100%',
    zIndex: 1,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 1,
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
    color: 'white',
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
  },
});

export default MapScreen;
