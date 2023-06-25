import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Button, Input, Layout, Divider, Toggle, Icon, IconElement } from '@ui-kitten/components';


//Trust with modern nice font it will look better
//Slso when the keyboard comes up it hides the text input and the button

const LoginScreen = ({ navigation }) => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
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

    console.log('Logged in successfully!');
  };

  
  const handleRegisterPress = () => {
    // Navigate to the Register screen
    navigation.navigate('Register');
  };

  const DividerWithText = ({ text }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <Text style={{ marginHorizontal: 10 }}>{text}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
    );
  };
  
  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>

        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };
  return (
      <View style={{ backgroundColor: "#EBECF0",  flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <Text
        style={styles.text}
        category='h1'
      >
          MOMENTS
      </Text>
      
      
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
        caption={renderCaption}
        secureTextEntry
        onChangeText={setPassword}
      />
        <DividerWithText text="div test" />

        <Button appearance='outline'  style={{ position: 'absolute', bottom: 70, left: 20, right: 20 }} onPress={handleLogin}>Login</Button>

        <Text style={{ position: 'absolute', bottom: 40, left: 20, right: 20 }}>
          
          Don't have an account? <Text style={{ color: 'blue' }} onPress={handleRegisterPress}>Register here</Text>
        </Text>
        
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  email: {
    width: '90%',
    margin: 8,
    maxWidth: 400,
  },

  password: {
    width: '90%',
    margin: 8,
    maxWidth: 400,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
});

export default LoginScreen;
