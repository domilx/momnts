import React from 'react';
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, Text, Button,  } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';



const EditProfileScreen = () => {

  const navigation = useNavigation();


  const handleSettings = () => {
    // Navigate to the Login screen
    navigation.navigate('Settings');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('./profile-image.jpg')} // Replace with the URL of the user's avatar
        />
        <Text style={styles.username}>Nathan Aruna</Text>
        <Text style={styles.value}>@nate282</Text> 
        
      </View>
      
      <View style={styles.infoContainer}>
      <View style={styles.buttonGroup}>

      <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={{paddingHorizontal: 5}}></View> 

      <TouchableOpacity onPress={handleSettings} style={styles.button}>
        <Text style={styles.buttonText}>  Settings  </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.divider} />
        <View style={styles.infoItem}>
        <Text style={styles.label}>Current Journey:</Text>
        <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
          <Text style={styles.text}>New York, USA 📍</Text>
        </View> 
        </View>
        <View style={styles.infoItem}>
        
          <Text style={styles.label}>Journey Points:</Text>
        <View style={[styles.badge, { backgroundColor: "#7A807C" }]}>
          <Text style={styles.text}>1.2M 🗺️</Text>
        </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Badges:</Text>
        
      
        
          
        </View>
      </View>


      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    
  },
  divider: {
    height: 0.3,
    backgroundColor: '#D6E0D9',
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#D6E0D9"
  },
  infoContainer: {
    marginVertical: 30,
    
    
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: "#D6E0D9"
  },
  value: {
    fontSize: 16,
    color: "#7A807C",
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D6E0D9',
    paddingVertical: 10,
    paddingHorizontal: 41,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

  export default EditProfileScreen;
