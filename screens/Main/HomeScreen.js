import React from 'react';
import { View,  StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card, Layout, Text, Avatar } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';

const Tab = createBottomTabNavigator();
const Header = (props: ViewProps): React.ReactElement => (
  <View {...props}>
   <View style={styles.container}>
  <View style={styles.userInfo}>
    <Avatar source={require('./profile-image.jpg')} />
    <View style={styles.textContainer}>
      <Text category='h6'>
        Username
      </Text>
      <Text category='s1'>
        Location (currently on a journey)
      </Text>
    </View>
  </View>
< /View>
  </View>
);

const Footer = (props: ViewProps): React.ReactElement => (
  <View
    {...props}
    // eslint-disable-next-line react/prop-types
    style={[props.style, styles.footerContainer]}
  >
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'
    >
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size='small'
    >
      ACCEPT
    </Button>
  </View>
);
const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'planet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Journeys') {
            iconName = focused ? 'map' : 'earth-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        style: styles.tabBar,
      }}
    >
      <Tab.Screen name="Journeys" component={MapScreen} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Home = () => {
  return (
    <View style={styles.screenContainer}>
     

    <Card
      style={styles.card}
      header={Header}
      
    >
      <Text>
        Hey this is the past nathan filling in random text so that you can ignore the fact the the whole page breaks when there is not enough content. Anyways other peoples journey pictures and point update will go here
      </Text>
    </Card>
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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 0, 
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8, // Set the desired margin between the avatar and the text
  },
});

export default HomeScreen;
