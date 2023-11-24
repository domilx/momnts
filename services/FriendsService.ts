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

export const sendFriendRequest = async (recipientId) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const senderId = currentUser.uid;
      const senderDocRef = doc(db, "users", senderId);
      const recipientDocRef = doc(db, "users", recipientId);

      await updateDoc(senderDocRef, {
        friendRequestsSent: arrayUnion(recipientId),
      });
      await updateDoc(recipientDocRef, {
        friendRequestsReceived: arrayUnion(senderId),
      });
    } else {
      throw new Error("No user logged in.");
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const getSentFriendRequests = async (userId) => {
  const requestsRef = collection(db, "users", userId, "sentFriendRequests");
  const sentRequestsSnapshot = await getDocs(requestsRef);
  const sentRequests = [];

  sentRequestsSnapshot.forEach((doc) => {
    sentRequests.push({ id: doc.id, ...doc.data() });
  });
  return sentRequests;
};

export const acceptFriendRequest = async (senderId) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const recipientId = currentUser.uid;
      const senderDocRef = doc(db, "users", senderId);
      const recipientDocRef = doc(db, "users", recipientId);

      // Transaction to ensure atomicity of the accept friend request operation
      await runTransaction(db, async (transaction) => {
        // Get the current data for sender and recipient
        const senderDoc = await transaction.get(senderDocRef);
        const recipientDoc = await transaction.get(recipientDocRef);

        if (!senderDoc.exists() || !recipientDoc.exists()) {
          throw new Error("User does not exist.");
        }

        // Update sender's document: remove the recipientId from friendRequestsSent and add to friends
        transaction.update(senderDocRef, {
          friendRequestsSent: arrayRemove(recipientId),
          friends: arrayUnion(recipientId)
        });

        // Update recipient's document: remove the senderId from friendRequestsReceived and add to friends
        transaction.update(recipientDocRef, {
          friendRequestsReceived: arrayRemove(senderId),
          friends: arrayUnion(senderId)
        });
      });
    } else {
      throw new Error("No user logged in.");
    }
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};
