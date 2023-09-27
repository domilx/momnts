import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
                <Text style={styles.title}>Blocked Users</Text>
                <View style={styles.rightSpacer} />
            </View>

            <ScrollView 
              style={styles.toggleContainer} 
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.settingChunk}>
                <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleProfile}>
                  <Image
                    source={require("../profile-image.jpg")}
                    style={styles.avatar}
                  />
                  <View style={styles.twoText}>
                    <Text style={styles.fullName}>Domenico Valentino</Text>
                    <Text style={styles.username}>Blocked 09/26/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />

              <View style={styles.settingChunk}>
                <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleProfile}>
                  <Image
                    source={require("../profile-image.jpg")}
                    style={styles.avatar}
                  />
                  <View style={styles.twoText}>
                    <Text style={styles.fullName}>Domenico Valentino</Text>
                    <Text style={styles.username}>Blocked 09/26/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />

              <View style={styles.settingChunk}>
                <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={toggleProfile}>
                  <Image
                    source={require("../profile-image.jpg")}
                    style={styles.avatar}
                  />
                  <View style={styles.twoText}>
                    <Text style={styles.fullName}>Domenico Valentino</Text>
                    <Text style={styles.username}>Blocked 09/26/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
                  
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
    width: 40,
    height: 40,
    borderRadius: 60,
    resizeMode: "cover",
    marginVertical: 5,
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
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
      paddingVertical: 11,
  },
  rightSpacer: {
    width: 25,
  },
  footerText: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#7A807C',
      marginBottom: 10,
  },
});

export default SettingsScreen;
