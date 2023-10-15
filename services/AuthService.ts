import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

const AuthService = {
    async isLoggedIn(): Promise<boolean> {
        const user = auth.currentUser;
        return user !== null;
    },

    async register(email: string, password: string, username: string, fullName: string, bio: string, profileImage: any): Promise<void> {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Upload the profile image to Firebase Storage
        const storageRef = ref(storage, `profileImages/${user?.uid}`);
        await uploadBytes(storageRef, profileImage);
        const imageUrl = await getDownloadURL(storageRef);

        // Save additional user details in Firestore
        await setDoc(doc(db, 'users', user?.uid), {
            username,
            fullName,
            bio,
            profileImageUrl: imageUrl,
        });
    },

    async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }
};

export default AuthService;
