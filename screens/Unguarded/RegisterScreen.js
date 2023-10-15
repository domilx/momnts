import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import AuthService from "../../services/AuthService";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {}, [name, username, bio, email]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleRegister = async () => {
    try {
      // Ensure we have the necessary details
      if (!name || !username || !bio || !email || !password || !image) {
        Alert.alert('Registration failed', 'Please fill in all fields.');
        return;
      }

      // Convert image URI to blob
      const response = await fetch(image);
      const blob = await response.blob();

      await AuthService.register(email, password, username, name, bio, blob);

      // Navigate or do any other tasks after successful registration
      console.log('Registration successful');
      navigation.navigate("MapScreen");
    } catch (error) {
      console.error(error);
      Alert.alert('Registration failed', error.message);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.titleView}>
          
            <View style={styles.top}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleReturn}
                style={styles.iconContainer}
              >
                <Text style={styles.cancel}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Register</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleRegister}
                style={styles.iconContainer}
              >
                <Text
                  style={[
                    styles.cancel,
                    { color: "white" },
                  ]}
                >
                  Create
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
                  onPress={pickImage}
                  style={styles.avatarClickableArea}
                >
                  <Image
                    source={{ uri: image }}
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
                      onChangeText={(text) => setName(text)}
                      keyboardAppearance='dark'
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
                      onChangeText={(text) => setUsername(text)}
                      keyboardAppearance='dark'
                    />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity
                    style={styles.settingItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.sectionHeading}>Bio:</Text>
                    <TextInput
                      style={styles.input}
                      multiline={true}
                      onChangeText={(text) => setBio(text)}
                      keyboardAppearance='dark'
                    />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity
                    style={styles.settingItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.sectionHeading}>Email:</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setEmail(text)}
                      keyboardAppearance='dark'
                    />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity
                    style={styles.settingItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.sectionHeading}>Password:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        style={styles.input}
                        defaultValue=""
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        keyboardAppearance='dark'
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    paddingVertical: 11,
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

export default RegisterScreen;
