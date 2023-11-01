import { auth, db } from '../firebase';
import { getDocs, query, where, collection } from 'firebase/firestore';

const searchUsers = async (searchQuery) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const usersCollection = collection(db, 'users');
      const q = query(
        usersCollection,
        where('username', '>=', searchQuery), 
      );

      const querySnapshot = await getDocs(q);
      const searchResults = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.username.includes(searchQuery)) {
          searchResults.push(userData);
        }
      });

      return searchResults;
    }
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export default {
  searchUsers,
};
