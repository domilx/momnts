import React from "react";
import { View, Image, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { uploadPhoto, updateDailyPhoto } from "../../../services/PostService"; // Replace with your Firebase functions
import { auth, db, storage } from "../../../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoURI } = route.params;

  const handleSavePhoto = async () => {
    // Check if a user is currently authenticated
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
  
      // Upload photo to Firebase Storage
      const downloadURL = await uploadPhoto(userId, photoURI); 
     
    } else {
      console.log('User not logged in');
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

        <TouchableOpacity onPress={() => navigation.goBack()}>
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
