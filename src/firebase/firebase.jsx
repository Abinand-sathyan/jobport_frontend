import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAiAoHD-U5tkzC0uC9EV2Z20EITGjMANqg",
  authDomain: "simplr-380809.firebaseapp.com",
  projectId: "simplr-380809",
  storageBucket: "simplr-380809.appspot.com",
  messagingSenderId: "191716981992",
  appId: "1:191716981992:web:524b3fbcedd5b259015d5d",
  measurementId: "G-F478NR69EN"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore();
  export const storage = getStorage();
  
  export default app;  