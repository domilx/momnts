//imports
import React, { useState, useEffect, Suspense, useRef } from "react";
import { Appearance, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import * as eva from "@eva-design/eva";
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//screens
import LoadingScreen from "./screens/LoadingScreen";
import WelcomeScreen from "./screens/Unguarded/WelcomeScreen";
import RegisterScreen from "./screens/Unguarded/RegisterScreen";
import LoginScreen from "./screens/Unguarded/LoginScreen";
import ProfileScreen from "./screens/Main/ProfileScreen";
import MapScreen from "./screens/Main/MapScreen";
import SettingsScreen from "./screens/Main/SettingScreen";
import EditProfileScreen from "./screens/Main/EditProfileScreen";
import BlockedUsersScreen from "./screens/Main/Settings/BlockedUsersScreen";
import AboutUsScreen from "./screens/Main/Settings/AboutUsScreen";
import HelpScreen from "./screens/Main/Settings/HelpScreen";
import CameraScreen from "./screens/Main/Video-Interfaces/CameraView";
import FriendsScreen from "./screens/Main/FriendsScreen";
import SearchScreen from "./screens/Main/SearchScreen";

import { auth } from "./firebase";


const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFontLoaded, setFontLoaded] = useState(false);

  StatusBar.setBarStyle('light-content');
  
  const loadFonts = async () => {
    await Font.loadAsync({
      ...MaterialCommunityIcons.font,
    });
  };
  useEffect(() => { 
    loadFonts().then(() => {
      setFontLoaded(true);
    });
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  if (!isFontLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlockedUsers"
            component={BlockedUsersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CameraView"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Friends"
            component={FriendsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
