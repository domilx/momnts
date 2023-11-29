import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntIcon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";

export default function CameraView() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const navigation = useNavigation();
  const [capturedPhoto, setCapturedPhoto] = useState(null); // New state to hold captured photo URI


  const handleReturn = () => {
    navigation.goBack();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();
        navigation.navigate('PostReview', { photoURI: uri });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
       <Camera
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        type={type}
      ></Camera>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonbackground}>
          <TouchableOpacity onPress={handleReturn}>
            <MatIcon name="close-circle-outline" size={35} color="#D6E0D9" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={takePicture}
          style={styles.circleButton}
        ></TouchableOpacity>

        <View style={styles.buttonbackground}>
          <TouchableOpacity onPress={toggleCameraType}>
            <MatIcon name="camera-retake-outline" size={35} color="#D6E0D9" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flex: 1,
    bottom: 60,
  },
  camera: {
    flex: 1,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    backgroundColor: "rgba(21, 21, 23, 0.7)",
    alignSelf: "center",
    elevation: 10,
    borderWidth: 4,
    borderColor: "#D6E0D9",
  },
  buttonbackground: {
    borderRadius: 25,
    backgroundColor: "rgba(21, 21, 23, 0.7)",
    alignItems: "center",
    alignContent: "column",
    justifyContent: "center",
    height: "70%",
    width: "15%",
  },

  button: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
