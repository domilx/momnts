import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VerticalButtonMenu = () => {
	const [expanded, setExpanded] = useState(false);
  
	const toggleMenu = () => {
	  setExpanded((prevExpanded) => !prevExpanded);
	};
  
	const renderButtons = () => {
	  const buttons = [
		{ label: 'Button 1', onPress: () => console.log('Button 1 pressed') },
		{ label: 'Button 2', onPress: () => console.log('Button 2 pressed') },
		{ label: 'Button 3', onPress: () => console.log('Button 3 pressed') },
	  ];
  
	  return buttons.map(({ label, onPress }) => (
		<TouchableOpacity key={label} style={styles.button} onPress={onPress}>
		  <Text style={styles.buttonText}>{label}</Text>
		</TouchableOpacity>
	  ));
	};
  
	return (
	  <View style={styles.container}>
		<View style={styles.menuContainer}>
		  {expanded && <View style={styles.menu}>{renderButtons()}</View>}
		</View>
		<TouchableOpacity style={styles.arrowButton} onPress={toggleMenu}>
		  <Icon name={expanded ? 'arrow-up-outline' : 'arrow-down-outline'} size={30} color="white" />
		</TouchableOpacity>
	  </View>
	);
  };
  
  const styles = StyleSheet.create({
	container: {
	  position: 'absolute',
	  bottom: 20,
	  right: 20,
	  flexDirection: 'row', // Make sure the menu and button align in a row
	  alignItems: 'flex-end', // Align items to the bottom
	},
	menuContainer: {
	  flex: 1,
	  alignItems: 'flex-end', // Align the menu to the right side
	},
	menu: {
	  backgroundColor: 'rgba(0, 0, 0, 0.8)',
	  borderRadius: 8,
	  padding: 8,
	  alignSelf: 'flex-end', // Align the buttons to the right side
	},
	button: {
	  paddingVertical: 8,
	  paddingHorizontal: 16,
	},
	buttonText: {
	  color: 'white',
	  fontSize: 16,
	},
	arrowButton: {
	  backgroundColor: 'blue',
	  borderRadius: 30,
	  width: 60,
	  height: 60,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
  });
  

export default VerticalButtonMenu;