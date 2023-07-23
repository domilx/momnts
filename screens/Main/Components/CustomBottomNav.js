import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

const BottomNavBar = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const slideUpAnimation = useRef(new Animated.Value(0)).current;
  const slideUpHeight = 300; // Adjust this value to set the slide-up height
  const navigation = useNavigation();


  const handleControlButtonPress = () => {
    // Handle control button press
    console.log('Control button pressed');
  };

  const handleFriends = () => {
    navigation.navigate('Friends');
  };

  const handleToggleContent = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    Animated.timing(slideUpAnimation, {
      toValue: isContentVisible ? 0 : -slideUpHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setContentVisible(!isContentVisible);
  };

  return (
      <Animated.View style={[styles.contentContainer, { bottom: slideUpAnimation }]}>
<View style={styles.container2}>

      <TouchableOpacity onPress={handleFriends} style={styles.navItem}>
        <Icon name="people" size={25} color="#D6E0D9" />
        <Text style={styles.name}>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.circleButton} onPress={handleToggleContent}>
      <MatIcon name="arrow-up-thin" size={30} color="#D6E0D9" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.navItem}>
        <Icon name="earth" size={25} color="#D6E0D9" />
        <Text style={styles.name}>Journeys</Text>
      </TouchableOpacity>
      
      </View>

        {/* Add your additional content here */}
      </Animated.View>


  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    height: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    elevation: 8,
    borderTopWidth: 2,
    borderColor: '#D6E0D9',
    borderRadius: 0,
    width: '110%',
    alignSelf: 'center',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 155,
  },
  name: {
    fontSize: 10,
    color: '#D6E0D9',
    fontWeight: 'bold',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'black', // Choose the color you want for the circle button
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 185, // Adjust the position to control how much the button sticks out
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 2,
    borderColor: '#D6E0D9',
    borderRadius: 50,
  },
});

export default BottomNavBar;
