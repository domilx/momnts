import { auth, db, storage } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  runTransaction,
  arrayRemove,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Function to upload photo to Firebase Storage
const uploadPhoto = async (userId, imageUri) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in.'); // Handle if there's no logged-in user
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
	

    const ref = storage.ref().child(`momnts/${currentUser.uid}/dailyPhoto.jpg`);
    await ref.put(blob);

    const downloadURL = await ref.getDownloadURL();
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
