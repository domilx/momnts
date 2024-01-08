import { getFriends } from './FriendsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

const getUserProfile = async () => {
    try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile !== null) {
            return JSON.parse(storedProfile);
        } else {
            const user = auth.currentUser;
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userProfile = await getDoc(userDoc);
                if (userProfile.exists()) {
                    const profileData = userProfile.data();
                    await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
                    return profileData;
                }
            }
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
    return null;  // Return null if there's an error or no profile
};

export const updateUserProfile = async (userData) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, userData);

      // If necessary, update local storage or retrieve updated user profile data
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};


const uploadImageToFirebaseStorage = async (selectedImage) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const storageRef = storage.ref(`avatars/${user.uid}`);
      const imageRef = storageRef.child('avatar.jpg');

      await imageRef.putFile(selectedImage);

      const imageUrl = await imageRef.getDownloadURL();
      return imageUrl;
    }
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};


export const getFriendsCount = async (userId: string): Promise<number> => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const friends = userDocSnap.data()?.friends || [];
        const friendsCount: number = friends.length;
        console.log("Friends count:", friendsCount);
        return friendsCount;
      } else {
        console.log("User document does not exist.");
        throw new Error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error getting friends count:", error);
      throw error;
    }
  };
  


  export default {
    getUserProfile,
    getFriendsCount,
    updateUserProfile,
    uploadImageToFirebaseStorage,
  };