import React, { useState } from "react";
import { View, div, Text, TextInput, StyleSheet, TouchableOpacity, Switch, TouchableWithoutFeedback } from "react-native";
import { Input, Button, Layout, Divider, Toggle, Icon, IconElement,  } from "@ui-kitten/components";
import { useNavigation } from '@react-navigation/native';



const SettingsScreen = () => {
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
  };


  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.titleView}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.toggleContainer}>
        <Text style={styles.sectionHeading}>Notifications</Text>
        <Switch
          trackColor={{ false: '#7A807C', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#7A807C' : '#7A807C'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notificationsEnabled}
        />

        <Text style={styles.sectionHeading}>Display Location</Text>
        <Switch
          trackColor={{ false: '##7A807C', true: '#81b0ff' }}
          thumbColor={darkModeEnabled ? '#7A807C' : '#7A807C'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkModeEnabled}
        />
     </View>
     </View>
     
    
    <TouchableOpacity onPress={handleReturn} style={styles.buttonContainer} >
      <Text style={styles.buttonText}>Return</Text>
    </TouchableOpacity>

    <Text style={{fontWeight: "bold", textAlign: "center", color: "#7A807C", position: "absolute", bottom: 40, left: 20, right: 20}}>
      domi & Nathan™
    </Text>

    </View>
    
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#D6E0D9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 15

  },
  titleView: {
    flex: 1,
    paddingTop: 80,
  },

  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#D6E0D9',
    paddingLeft: 8,
    
    textAlign: 'left',
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6E0D9',

  },
  toggleContainer: {
    marginLeft: 10,
    margintop: 30,

  },
  
  
});

export default SettingsScreen;
