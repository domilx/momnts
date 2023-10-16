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
  Modal,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import AuthService from "../../services/AuthService";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

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
      const [modalVisible, setModalVisible] = useState(false);

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

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <Text style={styles.title}>Register</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username:"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setUsername(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                keyboardAppearance='dark'
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email:"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                keyboardAppearance='dark'
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password:"
                placeholderTextColor="#7A807C"
                onChangeText={(text) => setPassword(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry={true}
                keyboardAppearance='dark'
              />
            </View>

           
           
            <Text style={styles.registerText}>
              Already have an account?{" "}
              <Text onPress={handleReturn} style={styles.registerLink}>
                Login
              </Text>
            </Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

          </ScrollView>

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
                    keyboardType="email-address"
                    autoCapitalize="none"
                    keyboardAppearance='dark'
                  />
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bio:"
                    placeholderTextColor="#7A807C"
                    onChangeText={(text) => setBio(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    keyboardAppearance='dark'
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

          <Text style={styles.footerText}>Domi, Nathan, Xin & Aly™</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 11,
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginTop: 80,
    marginBottom: 50,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
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
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#7A807C",
    marginBottom: 10,
    marginTop: 220,
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
    textAlign: "center",
    color: "#7A807C",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});

export default RegisterScreen;
