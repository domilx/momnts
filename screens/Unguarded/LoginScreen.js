import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Function to login/verify user credentials
    console.log("Logged in successfully!");
  };

  const handleRegisterPress = () => {
    // Navigate to the Register screen
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
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
        </View>


        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text onPress={handleRegisterPress} style={styles.registerLink}>
            Create One
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>domi & Nathan™</Text>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 15,
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
  inputContainer: {
    paddingLeft: 9,
    paddingTop: 40,
    paddingRight: 9,
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

export default LoginScreen;
