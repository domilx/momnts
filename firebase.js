import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {  
  //CONFIG
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app);

// If you need to set any asynchronous settings or configurations,
// do it inside this function.
const initializeFirebase = async () => {
  // Here you can handle any async initialization
  // For now, we've removed setPersistence as it's not correctly configured for React Native.
};

initializeFirebase();

export { db, auth, storage };
