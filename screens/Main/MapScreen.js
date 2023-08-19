import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BottomSheet } from './Components/BottomSheet';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from 'expo-haptics';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';

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
    console.log('Center button was pressed!');
  };

  const handleProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    navigation.navigate("Profile");
  };

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
        <Polyline coordinates={path} strokeColor="#000000" strokeWidth={3} />
        {location && (
          <Marker
            title="You are here"
            description="Tap for more details"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            {isFocused && (
              <Callout onPress={handleCalloutPress}>
                <Text>You are here</Text>
              </Callout>
            )}
          </Marker>
        )}
      </MapView>

      <BottomSheet show={show} onOuterClick={() => setShow(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <View style={styles.IconContainer}>
              <Icon name="account-group" size={30} color="#D6E0D9" onPress={handleButtonXPress}/>
              <Button title="Friends" color="#7A807C" onPress={handleButtonXPress} />
            </View>
            <View style={styles.IconContainer}>
              <Icon name="close-circle" size={30} color="#D6E0D9" onPress={handleCenterButtonClick}/>
              <Button title="" color="#7A807C" onPress={handleCenterButtonClick} />
            </View>
            <View style={styles.IconContainer}>
              <Icon name="sign-direction" size={30} color="#D6E0D9" onPress={handleButtonYPress} />
              <Button title="Journeys" color="#7A807C" onPress={handleButtonYPress} />
            </View>
          </View>
          {currentView === 'noview' && (
            <Text style={{color: "white"}}>noview</Text>
          )}
          {currentView === 'xView' && (
            <Text style={{color: "white"}}>Button "X" was pressed</Text>
          )}
          {currentView === 'yView' && (
            <Text style={{color: "white"}}>Button "Y" was pressed</Text>
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
    marginTop: 50,
    marginLeft: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginBottom: 10,
  }
});

export default MapScreen;
