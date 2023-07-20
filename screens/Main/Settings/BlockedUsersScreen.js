import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const BlockedUsersScreen = () => {
  const navigation = useNavigation();

  //Default states
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [ArEnabled, setArEnabled] = useState(false);

  
  
//Handle Notification Selection
  const toggleNotifications = () => {
    setNotificationsEnabled(prevState => !prevState);
  };

//Handle Location Selection
  const toggleLocation = () => {
    setLocationEnabled(prevState => !prevState);
  };

//Handle Ar Selection
  const toggleAR = () => {
    setArEnabled(prevState => !prevState);
  };

  //return to profile page 
  const handleReturn = () => {
    navigation.goBack();
  };

  const handleBlockedUsers = () => {
    navigation
  }


  return (

    <View style={styles.container}>

      <View style={styles.titleView}>

        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="arrow-left-thin" size={30} color="#D6E0D9" />
          </TouchableOpacity>
          <Text style={styles.title}>Blocked Users</Text>
        </View>

        <View style={styles.divider} />


        <ScrollView style={styles.toggleContainer}>

          <View style={styles.settingChunk}> 

          <View style={styles.sectionContainer}>
          <Image source={require('../profile-image.jpg')} style={styles.avatar} />
            <Text style={styles.sectionHeading}>
             Blocked User 1
            </Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#D6E0D9' : '#D6E0D9'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
          <Image source={require('../profile-image.jpg')} style={styles.avatar} />
            <Text style={styles.sectionHeading}>
             Blocked User 2
            </Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#D6E0D9' : '#D6E0D9'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          </View>


         </View>

  

    </ScrollView>
   </View>

    <Text style={styles.footerText}>
        domi & Nathan™
    </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D6E0D9',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  settingChunk: {
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    backgroundColor: '#D6E0D9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  toggleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  footerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7A807C',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
  },
});

export default BlockedUsersScreen;