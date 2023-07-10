import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card, Layout, Text, Avatar, useTheme } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';


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
          } else if (route.name === 'Map') {
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
          fontWeight: "bold",

        },
      }}
    >
      <Tab.Screen name="Map" options={{ headerShown: false }} component={MapScreen} />
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="Profile" options={{ headerShown: false,  }} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('Discovery');
  const navigation = useNavigation();
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const toggleFriends = () => {
    setModalVisible(!modalVisible);
  };
  
  
  const handleProfile = () => {
    navigation.navigate('Profile');
  }

  const handleSearch = () => {
    navigation.navigate('Search');
  }

  const handleTabPress = useCallback(tabName => {
    setSelectedTab(tabName);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme['color-basic-800'],
      },
      headerTintColor: theme['color-basic-100'],
    });
  }, [navigation, theme]);

  const renderChip = useCallback(
    (tabName, label) => {
      return (

        <Chip
          key={tabName}
          style={[styles.chip, { fontWeight: "bold" }, selectedTab === tabName && styles.selectedChip]}
          onPress={() => handleTabPress(tabName)}
        >
          <Text style={{fontWeight: "bold", color: "#000000"}}>{label}</Text>
        </Chip>
      );
    },
    [handleTabPress, selectedTab]
  );

  const tabs = [
    { name: 'Discovery', label: 'Discovery' },
    { name: 'Top Journeys', label: 'Top Journeys' },
    { name: 'My Friends', label: 'My Friends' },
  ];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfile}>
        <Image source={require('./profile-image.jpg')} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
        <TouchableOpacity onPress={handleProfile}>
          <Text style={[styles.username, { color: theme['color-basic-100'] }]}>Nathan Aruna</Text>
          </TouchableOpacity>
          <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
            <Text style={[styles.badgeText, { color: theme['color-basic-100'] }]}>New York, USA 📍</Text>
          </View>
        </View>

        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleFriends}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <View style={{
            backgroundColor: '#7A807C',
            borderRadius: 10,
            padding: 20,
            width: '80%',
            alignItems: 'center',
            elevation: 5 // Android only: Adds a shadow effect
          }}>
            <Text style={{color: "#D6E0D9", fontWeight: "bold", fontSize: 20}}>Friends List Will Go Here</Text>
            <Icon name="close" onPress={toggleFriends}size={30} color="#D6E0D9" />

          </View>
        </View>
      </Modal>

        <TouchableOpacity>
        <Icon name="people" onPress={toggleFriends} style={{left: 100}} size={30} color="#D6E0D9" />
        </TouchableOpacity>

        <TouchableOpacity>
        <Icon name="search" onPress={handleSearch} style={{left: 30}} size={30} color="#D6E0D9" />
        </TouchableOpacity>


      </View>
      <View style={styles.divider} />
      <View style={styles.container}>
        <View style={styles.chipsContainer}>
          {tabs.map(tab => renderChip(tab.name, tab.label))}
        </View>
        <Text style={[styles.title, { color: theme['color-basic-100'] }]}>{selectedTab}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 0.3,
    backgroundColor: '#D6E0D9',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 50,
    color: '#D6E0D9',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'top',
    padding: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chip: {
    marginHorizontal: 6,
    backgroundColor: '#7A807C',

  },
  selectedChip: {
    backgroundColor: '#D6E0D9',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 50,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',

  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D6E0D9",
    textAlign: "center",
  },
});

export default HomeScreen;