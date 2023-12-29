import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, Modal} from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import AuthService from "../../services/AuthService";

const RegisterScreen = () => {
    // Register variables
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);

    // Rando variables
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { width } = Dimensions.get("window");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleTextInputFocus = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); 
  };

  const handleRegister = async () => {
    try {
      if (!name || !username || !bio || !email || !password || !image) {
        Alert.alert('Registration failed', 'Please fill in all fields.');
        return;
      }
  
      const response = await fetch(image);
      const blob = await response.blob();
  
      await AuthService.register(email, password, username, name, bio, blob);
  
      console.log('Registration successful');
      setModalVisible(false); 
  
      navigation.navigate("MapScreen");
    } catch (error) {
      console.error(error);
      Alert.alert('Registration failed', error.message);
    }
  };

  return (
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

        {/* Title */}
         <View style={styles.titleView}>
            <Text style={styles.title}>Register</Text>
        </View>

        {/* Input fields */}
          <View style={{ ...styles.inputContainer, width: width - 30 }}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setUsername(text)}
                keyboardType="default"
                autoCapitalize="none"
                keyboardAppearance='dark'
                onFocus={handleTextInputFocus}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                keyboardAppearance='dark'
                onFocus={handleTextInputFocus}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter super secret password"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                keyboardAppearance='dark'
                onFocus={handleTextInputFocus}
              />
            </View>

            {/* Bottom container */}  
            <View style={styles.bottomContainer}>
              <Text style={styles.registerText}>
                 Already have an account?{" "}
                <Text onPress={handleReturn} style={styles.registerLink}>
                  Login
                </Text>
              </Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
               <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>Domi, Nathan, Xin & Aly™</Text>
            </View>

            {/* Modal 2nd stage of registration*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >

            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                  <View style={{padding: 40}}></View>
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
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name:"
                    placeholderTextColor="#7A807C"
                    onChangeText={(text) => setName(text)}
                    keyboardType="default"
                    autoCapitalize="none"
                    keyboardAppearance='dark'
                    onFocus={handleTextInputFocus}
                  />
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bio:"
                    placeholderTextColor="#7A807C"
                    onChangeText={(text) => setBio(text)}
                    keyboardType="defaults"
                    autoCapitalize="none"
                    keyboardAppearance='dark'
                    onFocus={handleTextInputFocus}
                  />

                  
                  <Text style={styles.registerText}>
                    Change registration details?{" "}
                    <Text  onPress={() => setModalVisible(false)} style={styles.registerLink}>
                       Return
                    </Text>
                  </Text>

                  <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                  <Text style={styles.footerText}>Domi, Nathan, Xin & Aly™</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingTop: 100,  
  },

  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
 
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  inputContainer: {
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1.2,
    borderColor: "#D6E0D9",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#D6E0D9",
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
    backgroundColor: "#7A807C",
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
  buttonContainer: {
    backgroundColor: "#D6E0D9",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,

  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    fontWeight: "bold",
    color: "#7A807C",
    marginVertical: 10,
  },
  registerLink: {
    fontWeight: "bold",
    textAlign: "right",
    color: "#D6E0D9",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  footerText: {
    fontWeight: "bold",
    color: "#7A807C",
    textAlign: "center",
  },
});

export default RegisterScreen;
