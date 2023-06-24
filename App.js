import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import register_screen from './screens/register_screen';
import login_screen from './screens/login_screen';
import newuser_screen from './screens/newuser_screen';
import loading_screen from './screens/loading_screen';
import start_screen from './screens/start_screen';

const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="start_scren">
        <Stack.Screen name="start_screen" component={start_screen} />
        <Stack.Screen name="register_screen" component={register_screen} />
        <Stack.Screen name="login_screen" component={login_screen} />
        <Stack.Screen name="newuser_screen" component={newuser_screen} />
        <Stack.Screen name="loading_screen" component={loading_screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
