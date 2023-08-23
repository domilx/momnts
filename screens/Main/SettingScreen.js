import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as Haptics from 'expo-haptics';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [ArEnabled, setArEnabled] = useState(false);

    const toggleNotifications = () => setNotificationsEnabled(prevState => !prevState);
    const toggleLocation = () => setLocationEnabled(prevState => !prevState);
    const toggleAR = () => setArEnabled(prevState => !prevState);

    const handleReturn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.goBack();
    };

    const handleBlockedUsers = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate("BlockedUsers");
    };

    const handleAboutUs = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate("AboutUs");
    };

    const handleHelp = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate("Help");
    };

    const toggleProfile = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate("EditProfile");
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity activeOpacity={0.7} onPress={handleReturn}>
                    <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <View style={{ width: 25 }} /> 
            </View>

            <ScrollView 
            style={styles.toggleContainer} 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
            >
            <View style={styles.settingChunk}>
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleProfile}>
               <Image
                  source={require("./profile-image.jpg")}
                  style={styles.avatar}
                />
                <View style={styles.twoText}>
                  <Text style={styles.fullName}>Domenico Valentino</Text>
                  <Text style={styles.username}>domenicoVal</Text>
                </View>
                <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
              </TouchableOpacity>
            </View>
                <Text style={styles.chunkTitle}>GENERAL</Text>
                <View style={styles.settingChunk}>
                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleNotifications}>
                        <Icon name="bell-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Notifications</Text>
                        <Switch
                            trackColor={{ false: '#7A807C', true: '#81b0ff' }}
                            thumbColor={notificationsEnabled ? '#D6E0D9' : '#D6E0D9'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleNotifications}
                            value={notificationsEnabled}
                            style={styles.switch}
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleLocation}>
                        <Icon name="map-marker-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Display Location</Text>
                        <Switch
                            trackColor={{ false: '#7A807C', true: '#81b0ff' }}
                            thumbColor={locationEnabled ? '#D6E0D9' : '#D6E0D9'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleLocation}
                            value={locationEnabled}
                            style={styles.switch}
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleAR}>
                        <Icon name="augmented-reality" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>AR Features</Text>
                        <Switch
                            trackColor={{ false: '#7A807C', true: '#B7C0BA' }}
                            thumbColor={ArEnabled ? '#FFF' : '#FFF'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleAR}
                            value={ArEnabled}
                            style={styles.switch}
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleBlockedUsers}>
                        <Icon name="account-off-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Blocked Users</Text>
                        <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.chunkTitle}>INFO</Text>
                <View style={styles.settingChunk}>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleAboutUs}>
                        <Icon name="information-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>About Us</Text>
                        <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleHelp}>
                        <Icon name="help-box" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Help</Text>
                        <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
                    </TouchableOpacity>

                </View>

                <Text style={styles.chunkTitle}>MORE</Text>
                <View style={styles.settingChunk}>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                        <Icon name="share-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Share Moments</Text>
                        <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
                    </TouchableOpacity>
                    
                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                        <Icon name="star-outline" size={24} color="#D6E0D9" style={styles.iconLeft} />
                        <Text style={styles.sectionHeading}>Rate Moments</Text>
                        <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>domi & Nathan™</Text>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000000',
      paddingHorizontal: 18,
  },
  twoText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    marginLeft: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7A807C',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    resizeMode: "cover",
    marginVertical: 5,
  },
  top: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 20,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#D6E0D9',
  },
  toggleContainer: {
      flex: 1,
  },
  settingChunk: {
      backgroundColor: '#151517',
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 20,
  },
  settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 11,  // Applied consistent padding to the entire settingItem
  },
  sectionHeading: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',  
      color: '#fdfdff',
      marginLeft: 10,
  },
  chunkTitle: {
      fontSize: 12,
      fontWeight: '500',
      color: '#4e4e4e',
      marginTop: 15,
  },
  divider: {
      height: 0.3,
      backgroundColor: "#29292b",
  },
  iconLeft: {
      width: 24,
      height: 24,
      marginLeft: 8,
  },
  arrow: {      
    marginRight: 5,
  },
  switch: {
      transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
      marginRight: 5,
  },
  logoutButton: {
      backgroundColor: '#151517',
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
  },
  logoutText: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
  },
  footerText: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#7A807C',
      marginBottom: 10,
  },
});


export default SettingsScreen;
