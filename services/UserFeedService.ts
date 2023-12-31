import { auth, db } from '../firebase';
import { getDoc, collection, getDocs, query, where, doc } from 'firebase/firestore';

const fetchUserFeed = async (loggedInUserId) => {
  try {
    const userDocRef = doc(db, 'users', loggedInUserId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      throw new Error('User document does not exist');
    }

    const userData = userDocSnapshot.data();
    if (!userData.friends || userData.friends.length === 0) {
      throw new Error('User has no friends or invalid friends list');
    }

    const userFeedPosts = [];

    for (const friendId of userData.friends) {
      const friendDocRef = doc(db, 'users', friendId);
      const friendDocSnapshot = await getDoc(friendDocRef);

      if (friendDocSnapshot.exists()) {
        const friendData = friendDocSnapshot.data();
        console.log('Friend Data:', friendData); // Log friendData to check profileImage field
        
        const momentsDocRef = doc(db, 'moments', friendId);
        const momentsSnapshot = await getDoc(momentsDocRef);

        if (momentsSnapshot.exists()) {
          const post = momentsSnapshot.data();
          // Combine post data with friend's info
          const postWithUserInfo = {
            ...post,
            username: friendData.username,
            profileImageUrl: friendData.profileImageUrl,
          };
          userFeedPosts.push(postWithUserInfo);
        }
      }
    }

    return userFeedPosts;
  } catch (error) {
    console.error('Error fetching user feed:', error);
    return [];
  }
};

export { fetchUserFeed };
