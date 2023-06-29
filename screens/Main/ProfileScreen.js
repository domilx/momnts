import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar, Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    // Navigate to the Login screen
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.space}>.</Text>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleSettings}
          >
            <Icon name="dots-horizontal" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("./profile-image.jpg")} // Replace with the URL of the user's avatar
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleEditProfile}
        >
          <Text style={styles.username}>Nathan Aruna  <Icon name="pencil" size={20} color="white" /> </Text>
          <Text style={styles.value}>@nate282</Text></TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.label}>Current Journey:</Text>
          <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
            <Text style={styles.text}>New York, USA 📍</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Journey Points:</Text>
          <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
            <Text style={styles.text}>1.2M 🗺️</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Badges:</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  space: {
    width: '40%',
    fontWeight: 'bold',
    alignItems: 'flex-begin',
    color: '#000000',
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  infoContainer: {
    marginVertical: 30,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#D6E0D9",
  },
  value: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#D6E0D9",
    paddingVertical: 10,
    paddingHorizontal: 41,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default ProfileScreen;
