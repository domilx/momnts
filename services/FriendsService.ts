// Import necessary modules from Firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have a 'db' object initialized for Firebase

const sendFriendRequest = async (senderId, receiverId) => {
  try {
    const friendRequestsCollection = collection(db, 'friendRequests');

    // Add a new document to the 'friendRequests' collection with senderId, receiverId, and status as 'pending'
    await addDoc(friendRequestsCollection, {
      senderId: senderId,
      receiverId: receiverId,
      status: 'pending',
      timestamp: new Date(),
    });

    return true; // Request sent successfully
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export default {
  sendFriendRequest,
};
