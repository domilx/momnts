import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export const sendFriendRequest = async (recipientId) => {
  try {
    // Get the currently logged-in user
    const currentUser = auth.currentUser;

    if (currentUser) {
      const senderId = currentUser.uid; 

      const senderDocRef = doc(db, 'users', senderId);
      const recipientDocRef = doc(db, 'users', recipientId);

      await updateDoc(senderDocRef, {
        friendRequestsSent: arrayUnion(recipientId),
      });

      await updateDoc(recipientDocRef, {
        friendRequestsReceived: arrayUnion(senderId),
      });
    } else {
      throw new Error('No user logged in.');
    }
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};