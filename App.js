import React, { useState, useEffect, Suspense } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/FirstUse/WelcomeScreen';
import RegisterScreen from './screens/FirstUse/RegisterScreen';
import LoginScreen from './screens/FirstUse/LoginScreen';
import HomeScreen from './screens/Main/HomeScreen';
import ProfileScreen from './screens/Main/ProfileScreen';
import MapScreen from './screens/Main/MapScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { useFonts } from 'expo-font';
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'


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
      setIsLoggedIn(false);
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
