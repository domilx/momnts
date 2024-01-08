import React from "react";
import { View, Image, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { uploadPhoto, updateMomnts } from "../../../services/PostService"; // Replace with your Firebase functions
import { auth, db, storage } from "../../../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoURI } = route.params;

  const handleRetakePhoto = () => {
    const photoURI = "";
    navigation.goBack();
  }

  const handleSavePhoto = async () => {
    try {
      console.log('Attempting to save photo');
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
  
        console.log('user id:', userId)
        console.log('photoURI:', photoURI)
        
        const downloadURL = await uploadPhoto(userId, photoURI);

        console.log('After uploadPhoto');
        console.log('Download URL:', downloadURL);
  
        if (downloadURL) {
          await updateMomnts(downloadURL);
          navigation.navigate("MapScreen");
        } else {
          console.log('Error uploading photo.');
        }
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error handling photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoURI }} style={styles.imageContainer} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSavePhoto}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Share Momnt</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRetakePhoto}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Retake Momnt</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  imageContainer: {
    width: 350,
    height: 650,
    marginBottom: 20,
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
 

  tabText: {
    backgroundColor: "#151517",
    fontSize: 20,
    fontWeight: "bold",
    color: "#B7C2B7",
    paddingHorizontal: 7,
  },

  tab: {
    borderWidth: 5,
    borderColor: "#151517",
    backgroundColor: "#151517",
    borderRadius: 20,
  },
});

export default PostReviewScreen;
