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
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    console.log("SNAP", userDocSnap.data());
    if (userDocSnap.exists()) {
      // Assuming 'friendRequestsSent' is an array of user IDs stored in the user's document
      const sentRequests = userDocSnap.data().friendRequestsSent;
      const profiles = await Promise.all(sentRequests.map(async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("FRIEND SNAP", docSnap.data());
          return docSnap.data();
        }
      }));
      return profiles
    } else {
      throw new Error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error getting sent friend requests:", error);
    throw error;
  }
};

export const getReceivedFriendRequests = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const receivedRequests = userDocSnap.data().friendRequestsReceived || [];
      
      const profiles = await Promise.all(receivedRequests.map(async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        }
      }));

      return profiles
    } else {
      throw new Error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error getting received friend requests:", error);
    throw error;
  }
};

export const getFriends = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Assuming 'friends' is an array of user IDs stored in the user's document
      const friends = userDocSnap.data().friends || [];
      return friends; // This will be an array of user IDs
    } else {
      throw new Error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error getting friends list:", error);
    throw error;
  }
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
          friends: arrayUnion(recipientId),
        });

        // Update recipient's document: remove the senderId from friendRequestsReceived and add to friends
        transaction.update(recipientDocRef, {
          friendRequestsReceived: arrayRemove(senderId),
          friends: arrayUnion(senderId),
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
