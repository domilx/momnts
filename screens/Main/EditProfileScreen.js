import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const DEFAULT_NAME = "John Doe";
  const DEFAULT_USERNAME = "johndoe";
  const DEFAULT_BIO = "This is my bio.";
  const DEFAULT_EMAIL = "johndoe@mail.com";

  const [name, setName] = useState(DEFAULT_NAME);
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  const [hasChanged, setHasChanged] = useState(false);
  useEffect(() => {
    if (
      name !== DEFAULT_NAME ||
      username !== DEFAULT_USERNAME ||
      bio !== DEFAULT_BIO ||
      email !== DEFAULT_EMAIL
    ) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [name, username, bio, email]);

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleAvatarClick = () => {
    console.log("Avatar or camera button clicked!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.top}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleReturn}
            style={styles.iconContainer}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity
            activeOpacity={hasChanged ? 0.5 : 1}
            onPress={hasChanged ? handleReturn : null}
            style={styles.iconContainer}
          >
            <Text
              style={[
                styles.cancel,
                hasChanged ? { color: "white" } : { color: "gray" },
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerTop} />
        <ScrollView
          style={styles.toggleContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.settingChunk}>
            <TouchableOpacity
              onPress={handleAvatarClick}
              style={styles.avatarClickableArea}
            >
              <Image
                source={require("./profile-image.jpg")}
                style={styles.avatar}
              />
              <View style={styles.cameraIconOverlay}>
                <Icon name="camera" size={20} color="#000000" />
              </View>
            </TouchableOpacity>

            <View style={styles.settingChunk2}>
              <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionHeading}>Full Name:</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={DEFAULT_NAME}
                  onChangeText={(text) => setName(text)}
                />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionHeading}>Username:</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={DEFAULT_NAME}
                  onChangeText={(text) => setName(text)}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.settingChunk2}>
              <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionHeading}>Bio:</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={DEFAULT_BIO}
                  multiline={true}
                  onChangeText={(text) => setBio(text)}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.settingChunk2}>
              <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionHeading}>Email:</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={DEFAULT_EMAIL}
                  onChangeText={(text) => setUsername(text)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Text style={styles.footerText}>domi & Nathan™</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  cancel: {
    color: "#D6E0D9",
    fontSize: 16,
    fontWeight: "500",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  input: {
    height: 30,
    width: 220,
    color: "#D6E0D9",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
  },
  settingChunk: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingChunk2: {
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
  avatarClickableArea: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  cameraIconOverlay: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "white",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  iconContainer: {
    alignItems: "flex-start",
  },
  toggleContainer: {
    marginHorizontal: 10,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  footerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#7A807C",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  divider: {
    height: 0.3,
    backgroundColor: "#29292b",
    marginVertical: 10,
  },
  dividerTop: {
    height: 0.3,
    backgroundColor: "#29292b",
  },
});

export default EditProfileScreen;
