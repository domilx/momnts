import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const CustomBottomNav = () => {
  const navigation = useNavigation();

  const handleControlButtonPress = () => {
    // Handle control button press
    console.log('Control button pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.navItem}>
        <Icon name="map-marker" size={35} color="black" />
        <Text style={styles.name} >Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.circleButton}>
        <Icon name="plus" size={70} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.navItem}>
        <Icon name="earth" size={35} color="black" />
        <Text style={styles.name}>Journeys</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#fff',
    elevation: 8,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 50,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white', // Choose the color you want for the circle button
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40, // Adjust the position to control how much the button sticks out
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 50,
  },
});

export default CustomBottomNav;
