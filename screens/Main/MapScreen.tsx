import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";
import { debounce } from "lodash";
import UserService from "../../services/UserService";
import startLocationTracking from "../../services/LocationService";
import { LinearGradient } from "expo-linear-gradient";

// comp imports
import { BottomSheet } from "./Components/BottomSheet";
import ControlPanel from "./Components/ControlPanel";
import ControlPanel2 from "./Components/ControlPanel2";
import ControlPanel3 from "./Components/ControlPanel3";
import BadgeIcon from "./Components/BadgeIcon";
import UserFeed from "./Dynamic-Content/UserFeed";
import UserMarker from "./Dynamic-Content/MapMarkers/UserMarker";
import PostMarker from "./Dynamic-Content/MapMarkers/PostMarker";
import TopAlert from "./Dynamic-Content/Alerts/TopAlert";
import Places from "./Dynamic-Content/Places";

const MapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState("noview");
  const [path, setPath] = useState([]);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [city, setCity] = useState("Montreal");
  const [profile, setProfile] = useState({});
  const [networkError, setNetworkError] = useState(false);
  
  startLocationTracking(); 

  const [hasZoomedIn, setHasZoomedIn] = useState(false); // New state variable


  const testLocation = {
    latitude: 45.577725,
    longitude: -73.756949,
  };

  const testLocation2 = {
    latitude: 45.569725,
    longitude: -73.726949,
  };

  const debouncedFetchCityName = useCallback(
    debounce(async (region) => {
      const maxLength = 15; // Set your desired maximum length here
      const cityName = await fetchCityName(region.latitude, region.longitude, maxLength);
      setCity(cityName);
    }, 2000),
    []
  );

  const handleNetworkError = () => {
    setNetworkError(true);

    // Simulate network error resolved after some time
    setTimeout(() => {
      setNetworkError(false);
    }, 5000); // Change the duration as needed
  };

  const fetchCityName = async (latitude, longitude, maxLength) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
  
      let cityName =
        data.city || data.locality || data.principalSubdivision || "";
      cityName = cityName.split("(")[0].trim();
  
      if (maxLength && cityName.length > maxLength) {
        cityName = cityName.substring(0, maxLength - 3) + "...";
      }
  
      return cityName;
    } catch (error) {
      console.error("Error fetching city name:", error);
      return null;
    }
  };

  const handleButtonXPress = () => {
    setCurrentView("xView");
    setShow(true);
    setIsComponentVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleButtonYPress = () => {
    setCurrentView("yView");
    setIsComponentVisible(false);
    setShow(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleCenterButtonClick = () => {
    navigation.navigate("CameraView");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  

  const handleProfile = () => {
    navigation.navigate("Profile");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onOuterClick = () => {
    setShow(false);
    setIsComponentVisible(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCurrentView("noview");
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const userProfile = await UserService.getUserProfile();
      if (userProfile) {
        setProfile(userProfile);
      }
    };
  
    const startLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied for location');
        return;
      }
  
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second (adjust as needed)
          distanceInterval: 1, // Update if the device has moved by 1 meter
        },
        (newLocation) => {
          setLocation(newLocation.coords);
          setPath((prevPath) => [...prevPath, newLocation.coords]);
        }
      );
  
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    };
  
    loadUserProfile();
    startLocationUpdates();
  }, []); 
  
  useEffect(() => {
    if (location && !hasZoomedIn) {
      // Focus on the user's location only when available and not already zoomed in
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
      setHasZoomedIn(true); // Update state to indicate that zooming has occurred
    }
  }, [location, hasZoomedIn]); // Li

  
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        
        <LinearGradient
          colors={["rgba(21, 21, 23, 0.9)", "rgba(21, 21, 23, 0)"]} // Reversed order of colors
          style={styles.background}
        />
        <ControlPanel2 cityName={city} />
      </View>
      <TopAlert
          message="Network issue encountered!"
          icon="router-wireless-off"
          title="Disconnected"
          showNotification={networkError}
        />
      <View style={styles.sideNav}>
        <TouchableOpacity onPress={handleProfile}>
          <Image
            style={styles.avatar}
            source={{ uri: profile.profileImageUrl }}
          />
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
        }}
      >
        <Marker coordinate={testLocation}>
          <PostMarker onPress={() => setModalVisible(true)} />
        </Marker>

        <Marker coordinate={testLocation2}>
          <PostMarker />
        </Marker>

        {location && (
          <Marker
            key={`${location.latitude}-${location.longitude}`}
            coordinate={location}
          >
            {isComponentVisible && (
              <UserMarker
                username={profile.username}
                image={{ uri: profile.profileImageUrl }}
              />
            )}
          </Marker>
        )}
      </MapView>

      <BottomSheet show={show} onOuterClick={onOuterClick}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleButtonXPress}
              style={styles.navItem}
            >
              <BadgeIcon iconName="account-group" badgeCount={3} />
              <Text style={styles.name}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleCenterButtonClick}
              style={styles.circleButton}
            ></TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleButtonYPress}
              style={styles.navItem}
            >
              <MatIcon name="map-marker-radius" size={35} color="#D6E0D9" />
              <Text style={styles.name}>Places</Text>
            </TouchableOpacity>
          </View>
          {currentView === "noview" && (
            <Text style={styles.infoText}>noview</Text>
          )}
          {currentView === "xView" && (
            <View style={styles.friendsListContainer}>
              <UserFeed />
            </View>
          )}
          {currentView === "yView" && (
            <View style={styles.friendsListContainer}>
              <Button
                title="Simulate Network Error"
                onPress={handleNetworkError}
              />

              <Places />
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: windowWidth,
    height: windowHeight,
  },
  sideNav: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    right: 10,
    zIndex: 1,
  },
  search: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 58,
    left: 15,
    zIndex: 1,
  },
  topNav: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    zIndex: 1,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#7A807C",
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  infoText: {
    color: "white",
  },
  name: {
    fontSize: 13,
    color: "#D6E0D9",
    fontWeight: "bold",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    backgroundColor: "#2D2D2D",
    alignSelf: "center",
    elevation: 10,
    borderWidth: 4,
    borderColor: "#D6E0D9",
  },
  friendsListContainer: {
    marginTop: 90,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -60,
    bottom: 0,
  },
});

export default MapScreen;
