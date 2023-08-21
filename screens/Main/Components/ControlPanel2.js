import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ControlPanel2 = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.iconContainer}>
            <MatIcon name="magnify" size={25} color="#D6E0D9" onPress={handleSettings}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.controlButtonText}>Montreal.. 📍</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'flex-start', // Aligns content to the left
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 7,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center', // Centers text vertically
  },
  controlButtonText: {
    color: '#D6E0D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ControlPanel2;
