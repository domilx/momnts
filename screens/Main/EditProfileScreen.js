import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Image } from "react-native";
import { Input } from "@ui-kitten/components";
import * as Haptics from 'expo-haptics';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const EditProfileScreen = () => {
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.goBack();
  };


  return (

    <View style={styles.container}>

      <View style={styles.titleView}>

        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="arrow-left-thin" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View style={styles.divider} />


        <ScrollView style={styles.toggleContainer}>

          <View style={styles.settingChunk}> 


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>
              <Image source={require('./profile-image.jpg')} style={styles.avatar} />
            </Text>
            <Text style={styles.sectionHeading}>Change Profile Picture</Text>
            <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="upload" size={30} color="white" />
          </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>About Me</Text>
            <TextInput
             style={[styles.input, {color: '#D6E0D9'}]}
             placeholder="Tell us about yourself."
             placeholderTextColor="#7A807C"
             keyboardType="email-address"
             autoCapitalize="none"
             
      />
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Public Profile</Text>
            <Switch
              trackColor={{ false: '#7A807C', true: '#00FF00' }}
              thumbColor={ArEnabled ? '#7D6E0D9' : '#D2E0D9'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAR}
              value={ArEnabled}
            />
          </View>
        </View>

        <View style={styles.settingChunk}> 

         <View style={styles.sectionContainer}>
         <Text style={styles.sectionHeading}>Full Name</Text>
         <TextInput
             style={[styles.input, {color: '#D6E0D9'}]}
             placeholder="Whats your name?"
             placeholderTextColor="#7A807C"
             keyboardType="email-address"
             autoCapitalize="none"
             
      />         
      </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Username</Text>
        <TextInput
             style={[styles.input, {color: '#D6E0D9'}]}
             placeholder="Whats your username?"
             placeholderTextColor="#7A807C"
             keyboardType="email-address"
             autoCapitalize="none"
             
      />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>My Website</Text>
        <TextInput
             style={[styles.input, {color: '#D6E0D9'}]}
             placeholder="Share your website."
             placeholderTextColor="#7A807C"
             keyboardType="email-address"
             autoCapitalize="none"
             
      />
        </View>
       
       </View>


      <TouchableOpacity style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Apply</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 50,
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D6E0D9',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 220
  },
  title: {
    fontSize: 20,
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
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

export default EditProfileScreen;