import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { query, collection, where, getDocs, limit, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as Location from 'expo-location';

// This function will uplaod the photo to firebase storage for use across the app
const uploadPhoto = async (userId, imageUri) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in.'); 
    }
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const currentDate = new Date().toISOString().replace(/[:.]/g, '-'); 
    const storageRef = ref(storage, `momnts/${currentUser.uid}/${currentDate}.jpg`);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
};

// This function will update user's document with the Momnt URL and other info(time. location, photoURL)
const updateMomnts = async (userId, photoURL) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const timeStamp = new Date().toISOString();

    const dailyMomnts = {
      photoURL: photoURL,
      location: { latitude, longitude },
      timeStamp: timeStamp,
    };

    await updateDoc(userDocRef, {
      postDataList: arrayUnion(dailyMomnts),
    });
    console.log('Post data updated successfully');
  } catch (error) {
    console.error('Error updating post data:', error);
  }
};

export { uploadPhoto, updateMomnts };
