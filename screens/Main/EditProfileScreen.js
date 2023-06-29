import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(prevState => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(prevState => !prevState);
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>EditProfile</Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.sectionContainer}>


          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Display Location</Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#81b0ff' }}
              thumbColor={darkModeEnabled ? '#7A807C' : '#7A807C'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={darkModeEnabled}
            />
          </View>
        </View>
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
  email: {
    paddingTop: 50,
    width: '97%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 20,
   
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
    marginBottom: 16,
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
});

export default SettingsScreen;