import React from 'react';
import { View, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { uploadPhoto, updateDailyPhoto } from '../../../services/PostService'; // Replace with your Firebase functions

const PostReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoURI } = route.params;

  const handleSavePhoto = async () => {
    // Upload photo to Firebase Storage
    const downloadURL = await uploadPhoto(userId, photoURI); // Replace userId with the user's ID
    if (downloadURL) {
      updateDailyPhoto(userId, downloadURL); // Update daily photo URL in Firestore
      navigation.goBack(); // Navigate back after saving the photo
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: photoURI }} style={{ width: 300, height: 300, marginBottom: 20 }} />
      <Button title="Save Photo" onPress={handleSavePhoto} />
      <Button title="Retake Photo" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PostReviewScreen;
