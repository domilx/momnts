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
        <Icon name="home" size={25} color="#D6E0D9" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.circleButton}>
        <Icon name="plus" size={50} color="#D6E0D9" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.navItem}>
        <Icon name="earth" size={25} color="#D6E0D9" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'black',
    elevation: 8,
    borderWidth: 1,
    borderColor: '#D6E0D9',
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 30,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 20, // Adjust the position to control how much the button sticks out
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 2,
    borderColor: '#D6E0D9',
    borderRadius: 50,
  },
});

export default CustomBottomNav;
