import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { BottomSheet } from './Components/BottomSheet';

function MapScreen() {
  const [show, setShow] = useState(false);
  const [currentView, setCurrentView] = useState('noview'); // 'main', 'xView', 'yView'

  const handleButtonXPress = () => {
    setCurrentView('xView');
    setShow(true);
  };

  const handleButtonYPress = () => {
    setCurrentView('yView');
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <BottomSheet show={show} onOuterClick={() => setShow(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.buttonsContainer}>
            <Button title="Button X" onPress={handleButtonXPress} />
            <Button title="Close" onPress={() => setShow(false)} />
            <Button title="Button Y" onPress={handleButtonYPress} />
          </View>
          {currentView === 'noview' && (
            <Text>noview</Text>
          )}
          {currentView === 'xView' && (
            <Text>Button "X" was pressed</Text>
          )}
          {currentView === 'yView' && (
            <Text>Button "Y" was pressed</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 10, // adjust as necessary
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  }
});

export default MapScreen;
