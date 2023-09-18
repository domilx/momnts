import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../../logic/services/AuthService";

const RegisterScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const authService = new AuthService('https://api.example.com');


  const handleRegister = async (email, password, username) => {
    try {
        // Register the user using the AuthService
        const response = await authService.register(email, password, username);
        
        if (response) {  // Depending on the API response, you can further refine this check
            console.log("Registered successfully!", response);
        } else {
            console.error("Registration failed.");
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
};

  const handleLoginPress = () => {
    // Navigate to the Login screen
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} >
      <View style={styles.titleView}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>

        <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#7A807C"
            value={username}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#7A807C"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />


          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#7A807C"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#7A807C"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Text style={styles.registerText}>
          Already have an account?{" "}
          <Text onPress={handleLoginPress} style={styles.registerLink}>
            Login
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister(email, password, username)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>domi & Nathan™</Text>
    </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#D6E0D9",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D6E0D9",
    marginBottom: 5,
  },
  inputContainer: {
    paddingLeft: 9,
    paddingTop: 40,
    paddingRight: 9,
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
  registerText: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#7A807C",
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 20,
  },
  registerLink: {
    fontWeight: "bold",
    textAlign: "right",
    color: "#D6E0D9",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 0,
  },
  titleView: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#D6E0D9",
    paddingLeft: 8,
    textAlign: "left",
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
