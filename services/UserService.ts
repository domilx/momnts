import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from "../firebase";
import { getDoc, doc } from 'firebase/firestore';

const getUserProfile = async () => {
    try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile !== null) {
            return JSON.parse(storedProfile);
        } else {
            const user = auth.currentUser;
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userProfile = await getDoc(userDoc);
                if (userProfile.exists()) {
                    const profileData = userProfile.data();
                    await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
                    return profileData;
                }
            }
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
    return null;  // Return null if there's an error or no profile
};

export default {
    getUserProfile
};
