import React, { useState } from "react";
import {
  View,
  div,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Input,
  Button,
  Layout,
  Divider,
  Toggle,
  Icon,
  IconElement,
} from "@ui-kitten/components";

//Trust with modern nice font it will look better
//Slso when the keyboard comes up it hides the text input and the button

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login using Firebase authentication
    //firebase
    //  .auth()
    //  .signInWithEmailAndPassword(email, password)
    //  .then((userCredential) => {
    //    // Login successful
    //    console.log('Logged in successfully!', userCredential.user);
    //  })
    //  .catch((error) => {
    //    // Login failed
    //    console.log('Login error:', error);
    //  });

    console.log("Logged in successfully!");
  };

  const handleRegisterPress = () => {
    // Navigate to the Register screen
    navigation.navigate("Register");
  };

  const renderPasswordCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>

        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  const renderUsernameCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>

        <Text style={styles.captionText}>
          This username is already taken
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Login</Text>
        <Input
      style={styles.email}
        label='Email'
        placeholder='Please enter your Email'
        value={email}
        secureTextEntry
        onChangeText={setEmail}
      />
     <Input
      style={styles.password}
        label='Password'
        placeholder='Please enter your password'
        value={password}
        caption={renderPasswordCaption}
        secureTextEntry
        onChangeText={setPassword}
      />
      </View>


      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#7A807C",
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
        }}
      >
        domi & Nathan™
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  email: {
    paddingTop: 50,
    width: '94%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
  },
  password: {
    width: '94%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
  },
  titleView: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#D6E0D9',
    
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7A807C',
    textAlign: 'center',
  },
});

export default LoginScreen;
