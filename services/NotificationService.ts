import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db, storage } from "../firebase";

// Assuming you have initialized Firebase appropriately
const db = firebase.firestore();

const currentUser = auth.currentUser;
if (!currentUser) {
  throw new Error('No user logged in.'); 
}
// Listen for changes in receivedRequest field for a specific user
const userRef = db.collection('users').doc(currentUser);

// Setting up the listener
const unsubscribe = userRef.onSnapshot((snapshot) => {
  const userData = snapshot.data();
  if (userData?.receivedRequest) {
    // Trigger your notification here using the service or function you created before
    notificationService.showNotification(
      'You have a new friend request!',
      'friend_request_icon',
      'New Friend Request'
    );

    // After handling the notification, you might want to update receivedRequest to handle it, for example:
    userRef.update({ receivedRequest: false });
  }
});

// Remember to unsubscribe when the component unmounts or when you don't need it anymore
// unsubscribe();
