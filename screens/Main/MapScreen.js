import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BottomSheet } from './Components/BottomSheet';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from 'expo-haptics';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import FriendsList from './Dynamic-Content/FriendsList';

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState('noview');
  const [path, setPath] = useState([]);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
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
    console.log('Center button was pressed!');
  };

  const handleProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    navigation.navigate("Profile");
  };

  useEffect(() => {
    const getLocation = async () => {
      // Location fetching logic
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sideNav}>
        <TouchableOpacity activeOpacity={1} onPress={handleProfile}>
          <Image style={styles.avatar} source={require("./profile-image.jpg")} />
        </TouchableOpacity>
      </View>

      <MapView
         ref={mapRef}
         style={styles.map}
         showsCompass={false}
         initialRegion={{
           latitude: location?.latitude || 0,
           longitude: location?.longitude || 0,
           latitudeDelta: 0.4,
           longitudeDelta: 0.4,
         }}>
        {/* Map content */}
      </MapView>

      <BottomSheet show={show} onOuterClick={() => setShow(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <View style={styles.IconContainer}>
              <Icon name="account-group" size={30} color="#D6E0D9" onPress={handleButtonXPress} />
              <Button title="Friends" color="#7A807C"  />
            </View>
            <View style={styles.IconContainer}>
              <Icon name="plus-circle" size={32} color="#D6E0D9" onPress={handleCenterButtonClick} />
              <Button title="" color="#7A807C"  />
            </View>
            <View style={styles.IconContainer}>
              <Icon name="sign-direction" size={30} color="#D6E0D9"  onPress={handleButtonYPress} />
              <Button title="Journeys" color="#7A807C"  />
            </View>
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
    paddingHorizontal: 35,
  },
  IconContainer: {
    alignItems: 'center',
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
    borderRadius: 60,
    marginBottom: 10,
  },
  friendsListContainer: {
    marginTop: 90,
  },
  infoText: {
    color: "white",
  },
});

export default MapScreen;
