import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

export const updateLiveLocation = async (userId, latitude, longitude) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Update the live location fields in the user document
    await updateDoc(userDocRef, {
      liveLocation: {
        latitude,
        longitude,
      },
    });

    console.log('Live location updated successfully.');

    // Return a function to listen for changes in the live location
    return onSnapshot(userDocRef, (doc) => {
      const liveLocation = doc.data()?.liveLocation;
      // Handle live location changes here if needed
    });
  } catch (error) {
    console.error('Error updating live location:', error);
    throw error;
  }
};

export const getFriendsLiveLocations = async (loggedInUserId) => {
  try {
    const loggedInUserDocRef = doc(db, 'users', loggedInUserId);
    const loggedInUserDocSnap = await getDoc(loggedInUserDocRef);

    if (loggedInUserDocSnap.exists()) {
      const friendsList = loggedInUserDocSnap.data()?.friends || [];

      // Fetch live locations of friends from their documents
      const friendsLiveLocations = await Promise.all(
        friendsList.map(async (friendId) => {
          const friendDocRef = doc(db, 'users', friendId);
          const friendDocSnap = await getDoc(friendDocRef);

          if (friendDocSnap.exists()) {
            return {
              id: friendId,
              liveLocation: friendDocSnap.data()?.liveLocation || null,
            };
          } else {
            console.log(`Friend document with ID ${friendId} does not exist.`);
            return null;
          }
        })
      );

      return friendsLiveLocations.filter((friend) => friend !== null);
    } else {
      console.log('User document does not exist.');
      return [];
    }
  } catch (error) {
    console.error('Error getting friends live locations:', error);
    throw error;
  }
};
