import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';


const SettingsScreen = () => {
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
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.divider} />


        <ScrollView style={styles.toggleContainer}>

          <View style={styles.settingChunk}> 

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Notifications</Text>
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
            <Text style={styles.sectionHeading}>Display Location</Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#81b0ff' }}
              thumbColor={locationEnabled ? '#D6E0D9' : '#D6E0D9'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLocation}
              value={locationEnabled}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>AR Features</Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#B7C0BA' }}
              thumbColor={ArEnabled ? '#FFF' : '#FFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAR}
              value={ArEnabled}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Blocked Users</Text>
            <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="arrowright" size={30} color="white" />
           </TouchableOpacity>
          </View>

          
        </View>

        <View style={styles.settingChunk}> 

         <View style={styles.sectionContainer}>
           <Text style={styles.sectionHeading}>About Us</Text>
           <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="info" size={30} color="white" />
           </TouchableOpacity>
         </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Help</Text>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="questioncircle" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

       <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Share Moments</Text>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="link" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

       <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Rate Moments</Text>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="star" size={30} color="white" />
          </TouchableOpacity>
        </View>

       </View>


      <TouchableOpacity style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 20,
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

export default SettingsScreen;