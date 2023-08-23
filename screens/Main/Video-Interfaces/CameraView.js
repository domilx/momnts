import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();

const handleReturn = () => {
    navigation.goBack();
  };


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>



      <Camera style={styles.camera} type={type}>
      <View style={{marginTop: 50, right: -25}}>
    <View style={styles.buttoCcontainer}>
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <TouchableOpacity  style={{ marginBottom: 10 }}>
          <MatIcon name="arrow-left-thin" onPress={handleReturn} size={35} color="#D6E0D9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType} style={{ marginBottom: 10 }}>
          <MatIcon name="camera-flip" size={35} color="#D6E0D9" />
        </TouchableOpacity>
        
      </View>
    </View>
    </View>
  
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {

    flex: 1,
    borderRadius: 25,
    backgroundColor: 'rgba(21, 21, 23, 0.7)',
    alignItems: 'center',
    alignContent: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '76%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

