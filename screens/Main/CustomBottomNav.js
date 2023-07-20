import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <Icon name="people" size={35} color="#D6E0D9" />
        <Text style={styles.name}>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.circleButton}>
        <MatIcon name="plus" size={70} color="#D6E0D9" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleControlButtonPress} style={styles.navItem}>
        <Icon name="earth" size={35} color="#D6E0D9" />
        <Text style={styles.name}>Journeys</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
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
  },
  name: {
    fontSize: 10,
    color: '#D6E0D9',
    fontWeight: 'bold',
  },
  circleButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'black', // Choose the color you want for the circle button
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40, // Adjust the position to control how much the button sticks out
    alignSelf: 'center',
    elevation: 10,
    borderWidth: 2,
    borderColor: '#D6E0D9',
    borderRadius: 50,
  },
});

export default CustomBottomNav;
