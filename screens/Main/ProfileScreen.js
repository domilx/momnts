import React from "react";
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>

       <TouchableOpacity style={{marginTop: 20, marginLeft: 300}} activeOpacity={1} onPress={handleSettings}>
          <Icon name="dots-horizontal" size={40} color="white" />
        </TouchableOpacity>
      <View style={styles.top}>
        
       
      </View>

      <View style={styles.header}>
        <Image style={styles.avatar} source={require("./profile-image.jpg")} />
        <TouchableOpacity activeOpacity={1} onPress={handleEditProfile}>
          <View style={styles.header}>
            <View style={styles.namesIcon}>
              <Text style={styles.username}> Nathan Aruna </Text>
              <Icon name="pencil" size={20} color="white" />
            </View>
            <Text style={styles.value}>@nate282</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={[styles.label, styles.maxWidth]}>Current Journey:</Text>
          <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
            <Text style={styles.text}>   New York, USA 📍    </Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={[styles.label, styles.maxWidth]}>Journey Points:</Text>
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
    backgroundColor: "#000000",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  space: {
    width: "40%",
    fontWeight: "bold",
    alignItems: "flex-start",
    color: "#000000",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  namesIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    maxWidth: '90%',
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
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
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    maxWidth: '90%',
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  maxWidth: {
    maxWidth: '90%',
  },
});

export default ProfileScreen;
