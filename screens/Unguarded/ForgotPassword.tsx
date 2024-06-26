import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthService from "../../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import OverlayComponent from "../Main/Components/LoadingOverlay";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }) => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };


  // Handles navigation to register screen
  const handleReturnPress = () => {
    navigation.goBack();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Handles haptic feedback on text input focus
  const handleTextInputFocus = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Handles login logic

  const handlePasswordReset = async (email) => {
    setOverlayVisible(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
       setOverlayVisible(false);
       navigation.goBack();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.titleView}>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        {/* Input fields */}
        <View style={{ ...styles.inputContainer, width: width - 30 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={{ ...styles.input, fontSize: 13 }} // Dynamic font size
            placeholder="Enter your email"
            placeholderTextColor="#7A807C"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            keyboardAppearance="dark"
            onFocus={handleTextInputFocus}
          />

          <Text style={styles.forgotPassword}>
            Please provide us with the email you used to create your account so
            we can send instructions to reset your password
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          {/* Register link */}
          <Text style={styles.registerText}>
            Rememeber your password?{" "}
            <Text onPress={handleReturnPress} style={styles.registerLink}>
              Return
            </Text>
          </Text>
          {/* Login button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handlePasswordReset(email)}
          >
            <Text style={styles.buttonText}>Send Reset Instructions</Text>
          </TouchableOpacity>

          <OverlayComponent
            isVisible={isOverlayVisible}
            onClose={handleCloseOverlay}
          />
          {/* Footer */}
          <Text style={styles.footerText}>Domi, Nathan, Xin & Aly™</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  inputContainer: {
    paddingTop: 40,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginBottom: 5,
  },

  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7A807C",
    marginTop: 6,
    marginRight: 10,
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
  input2: {
    height: 40,
    borderWidth: 1.2,
    borderColor: "#D6E0D9",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#D6E0D9",
  },
  registerText: {
    fontWeight: "bold",
    color: "#7A807C",
    marginVertical: 10,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  buttonContainer: {
    backgroundColor: "#D6E0D9",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontWeight: "bold",
    color: "#7A807C",
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },

  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default ForgotPasswordScreen;
