//imports
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { useFonts } from 'expo-font';
import * as eva from '@eva-design/eva';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//screens
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/Unguarded/WelcomeScreen';
import RegisterScreen from './screens/Unguarded/RegisterScreen';
import LoginScreen from './screens/Unguarded/LoginScreen';
import HomeScreen from './screens/Main/HomeScreen';
import ProfileScreen from './screens/Main/ProfileScreen';
import MapScreen from './screens/Main/MapScreen';
import SettingsScreen from './screens/Main/SettingScreen';
import EditProfileScreen from './screens/Main/EditProfileScreen';

const Stack = createStackNavigator();

 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // Simulating an asynchronous login check
  useEffect(() => {
    // Replace this with your actual login check logic
    setTimeout(() => {
      // Simulating a successful login

      //comment the next line to see the welcome screen
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>

        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        )}

        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>



      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
