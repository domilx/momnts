import React from 'react';
import { View,  StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card, Layout, Text, Avatar } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';

const Tab = createBottomTabNavigator();



const HomeScreen = () => {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Journeys') {
            iconName = focused ? 'earth' : 'earth-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      
      tabBarOptions={{
        activeTintColor: '#D6E0D9',
        inactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          paddingBottom: 5,
        },
      
        
      }}
    >
      <Tab.Screen name="Journeys" options={{ headerShown: false }} component={MapScreen} />
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="Profile" options={{ headerShown: false }}component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Home = () => {
  return (

    <View style={styles.screenContainer}>
    <View style={styles.header}>
      <Image source={require('./profile-image.jpg')} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>Nathn Aruna</Text>
        <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
          <Text style={styles.badgeText}>New York, USA 📍</Text>
    </View>
    </View>
    </View>
    <View style={styles.divider} />


    </View>
    
    
    
  );
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingBottom: 5,
  },
  divider: {
    height: 0.3,
    backgroundColor: '#D6E0D9',
    marginVertical: 10,
  },
  screenContainer: {
    flex: 1,
    backgroundColor:"#000000",
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 100, 
    backgroundColor:"#000000"
  },

  topnav: {
    row: 3,
    fontSize: 16,
    color: "#7A807C",
    fontWeight: 'bold',
  },
 
  textContainer: {
    marginLeft: 8,
    color: "#D6E0D9" // Set the desired margin between the avatar and the text
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 60,
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#D6E0D9"
  },
  status: {
 
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});


export default HomeScreen;
