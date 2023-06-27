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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
