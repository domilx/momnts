import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { debounce } from 'lodash';

// comp imports
import { BottomSheet } from './Components/BottomSheet';
import ControlPanel from './Components/ControlPanel';
import ControlPanel2 from './Components/ControlPanel2';
import ControlPanel3 from './Components/ControlPanel3';
import FriendsList from './Dynamic-Content/FriendsList';
import FriendPost from './Dynamic-Content/FriendPost';
import UserMarker from './Dynamic-Content/UserMarker';

const MapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState('noview');
  const [path, setPath] = useState([]);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [city, setCity] = useState('Montreal');

  const debouncedFetchCityName = useCallback(
    debounce(async (region) => {
      const cityName = await fetchCityName(region.latitude, region.longitude);
      setCity(cityName);
    }, 2000),
    []
  );

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();

      let cityName = data.city || data.locality || data.principalSubdivision || '';
      cityName = cityName.split('(')[0].trim();

      return cityName;
    } catch (error) {
      console.error('Error fetching city name:', error);
      return null;
    }
  };

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

  const handleProfile = () => {
    navigation.navigate('Profile');
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
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <ControlPanel2 cityName={city} />
      </View>
      <View style={styles.sideNav}>
        <TouchableOpacity onPress={handleProfile}>
          <Image style={styles.avatar} source={require('./profile-image.jpg')} />
        </TouchableOpacity>
        {isComponentVisible && <ControlPanel />}
      </View>

      <View style={styles.search}>
        <ControlPanel3 />
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
        
        {location && (
          
          <Marker
            key={`${location.latitude}-${location.longitude}`}
            coordinate={location}>
            {isComponentVisible && <UserMarker />}
          </Marker>
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
              style={styles.circleButton}></TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleButtonYPress}
              style={styles.navItem}>
              <MatIcon name="map-marker-radius" size={35} color="#D6E0D9" />
              <Text style={styles.name}>Places</Text>
            </TouchableOpacity>
          </View>
          {currentView === 'noview' && <Text style={styles.infoText}>noview</Text>}
          {currentView === 'xView' && (
            <View style={styles.friendsListContainer}>
              <FriendPost />
            </View>
          )}
          {currentView === 'yView' && <View style={styles.friendsListContainer}></View>}
        </View>
      </BottomSheet>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: windowWidth,
    height: windowHeight,
  },
  sideNav: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    right: 10,
    zIndex: 1,
  },
  search: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 58,
    left: 15,
    zIndex: 1,
  },
  topNav: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
    zIndex: 1,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    marginBottom: 20,
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
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    backgroundColor: '#2D2D2D',
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 4,
    borderColor: '#D6E0D9',
  },
  friendsListContainer: {
    marginTop: 90,
  },
});

export default MapScreen;
