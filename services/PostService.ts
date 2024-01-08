import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { query, collection, where, getDocs, setDoc, getDoc, limit, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as Location from 'expo-location';
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';


const getTimeAgoString = (timestamp) => {
  const postedTime = new Date(timestamp);
  const currentTime = new Date();

  const hoursDiff = differenceInHours(currentTime, postedTime);
  const minutesDiff = differenceInMinutes(currentTime, postedTime);
  const secondsDiff = differenceInSeconds(currentTime, postedTime);

  if (hoursDiff >= 24) {
    const days = Math.floor(hoursDiff / 24);
    return `Posted ${days} Day${days > 1 ? 's' : ''} Ago`;
  } else if (hoursDiff > 0) {
    return `Posted ${hoursDiff} Hour${hoursDiff > 1 ? 's' : ''} Ago`;
  } else if (minutesDiff > 0) {
    return `Posted ${minutesDiff} Minute${minutesDiff > 1 ? 's' : ''} Ago`;
  } else {
    return `Posted ${secondsDiff} Second${secondsDiff > 1 ? 's' : ''} Ago`;
  }
};

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
const updateMomnts = async (photoURL) => {
  try {
    const userId = auth.currentUser.uid; 
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const timeStamp = new Date().toISOString();

    const dailyMomnts = {
      userId: userId,
      photoURL: photoURL,
      timeStamp: timeStamp,
      latitude: latitude, 
      longitude: longitude, 
    };

    // Reference the 'moments' collection and the document with the user's ID
    const momentsDocRef = doc(db, 'moments', userId);

    // Set the document data using the dailyMomnts object
    await setDoc(momentsDocRef, dailyMomnts);

    console.log('Moment added successfully');
  } catch (error) {
    console.error('Error adding moment:', error);
  }
};

export { uploadPhoto, updateMomnts, getTimeAgoString };
