import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";

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
  const requestsRef = collection(db, 'users', userId, 'sentFriendRequests');
  const sentRequestsSnapshot = await getDocs(requestsRef);
  const sentRequests = [];
  sentRequestsSnapshot.forEach((doc) => {
    sentRequests.push({ id: doc.id, ...doc.data() });
  });
  return sentRequests;
};
