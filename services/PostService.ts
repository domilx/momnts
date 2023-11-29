import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { query, collection, where, getDocs, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to upload photo to Firebase Storage
const uploadPhoto = async (userId, imageUri) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in.'); // Handle if there's no logged-in user
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Reference to the storage location
    const storageRef = ref(storage, `momnts/${currentUser.uid}/dailyPhoto.jpg`);

    // Upload the image blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
};
// Function to update user's document with the daily photo URL
const updateDailyPhoto = async (userId, photoURL) => {
  try {
    await db.collection('users').doc(userId).update({
      dailyPhoto: photoURL,
    });
    console.log('Daily photo URL updated successfully');
  } catch (error) {
    console.error('Error updating daily photo URL:', error);
  }
};

export { uploadPhoto, updateDailyPhoto };
