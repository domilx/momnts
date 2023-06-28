import React, { useState } from "react";
import { View, div, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, TouchableWithoutFeedback } from "react-native";
import { Input, Button, Layout, Divider, Toggle, Icon, IconElement,  } from "@ui-kitten/components";
import { useNavigation } from '@react-navigation/native';



const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    // Perform save action with the updated profile data
    console.log('Saving profile...');
  };


  const handleReturn = () => {
    navigation.goBack();
  };

  

  return (
    <View style={styles.container}>
      
    <View style={styles.titleView}>
      <Text style={styles.title}>Edit Profile</Text>


      <View style={styles.header}>
      <Image source={require('./profile-image.jpg')} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>Nathn Aruna</Text>
        <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
        </View>
      </View>
    </View>
      
    <Input style={styles.email} label='Display Name' placeholder='Please enter your display name'  />
    <Input style={styles.password} label='About Me' placeholder='Please enter your password'  secureTextEntry />
    </View>

     
     
    <TouchableOpacity onPress={handleReturn} style={styles.buttonContainer} >
      <Text style={styles.buttonText}>Return</Text>
    </TouchableOpacity>

    <Text style={{fontWeight: "bold", textAlign: "center", color: "#7A807C", position: "absolute", bottom: 40, left: 20, right: 20}}>
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
    marginBottom: 70,
  },

  email: {
    paddingTop: 20,
    width: '97%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 30,
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#D6E0D9"
  },
  password: {
    width: '97%',
    margin: 8,
    maxWidth: 400,
    fontSize: 20,
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


  
  
});

export default EditProfileScreen;
