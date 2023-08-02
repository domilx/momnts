import React, { useState } from "react";
import { View, div, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Input, Button, Layout, Divider, Toggle, Icon, IconElement } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";



const ProfileCreation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {    
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Welcome</Text>
        <View style={{paddingLeft: 9, paddingTop: 40, paddingRight: 9}}>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[styles.input, {color: '#D6E0D9'}]}
        placeholder="Enter your email"
        placeholderTextColor="#7A807C"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        tex
      />
     
     <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, {color: '#D6E0D9'}]}
        placeholder="Enter your password"
        placeholderTextColor="#7A807C"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TextInput
        style={[styles.input, {color: '#D6E0D9'}]}
        placeholder="Confirm your password"
        placeholderTextColor="#7A807C"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      
      
      </View>
     
      </View>

      

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>

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
  buttonContainer: {
    backgroundColor: '#D6E0D9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },

  circleButtonContainer: {

  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7A807C"', // Set the background color of the circular button
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 15

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D6E0D9',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D6E0D9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontWeight: 'bold',
    color: "#7A807C"
  },
  email: {
    paddingTop: 50,
    width: '97%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
  },
  password: {
    width: '97%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
  },
  titleView: {
    flex: 1,
    paddingTop: 80,
  },

  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#D6E0D9',
    paddingLeft: 8,
    
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7A807C',
    textAlign: 'center',
  },
  
  
});

export default ProfileCreation;
