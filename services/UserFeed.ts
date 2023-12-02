import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

const getPostData = async (userId) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const postDataList = userData.postDataList || [];

        const usernames = await Promise.all(
          postDataList.map(async (post) => {
            const postAuthorDocRef = doc(db, 'users', post.authorId);
            const postAuthorDocSnap = await getDoc(postAuthorDocRef);
            return postAuthorDocSnap.exists() ? postAuthorDocSnap.data().username : 'Unknown';
          })
        );

        return { postDataList, usernames };
      } else {
        throw new Error('User document does not exist.');
      }
    } else {
      throw new Error('User not authenticated.');
    }
  } catch (error) {
    console.error('Error fetching user posts and usernames:', error);
    throw error;
  }
};

export { getPostData };
