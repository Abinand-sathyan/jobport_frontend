import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCSYMBBoE74z_bQgD1mjBS0EzHk2J1YCi4",
  authDomain: "productlistapp-af8e6.firebaseapp.com",
  projectId: "productlistapp-af8e6",
  storageBucket: "productlistapp-af8e6.appspot.com",
  messagingSenderId: "299794809441",
  appId: "1:299794809441:web:92c6763bcdae343ab42020",
  measurementId: "G-4XML40JFMZ"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore();
  export const storage = getStorage();
  
  export default app;  