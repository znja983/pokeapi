import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
apiKey: "AIzaSyByiowB5KEE-J81VSWc3LOjWtIKRPqd7zo",
authDomain: "trench-41af4.firebaseapp.com",
projectId: "trench-41af4",
storageBucket: "trench-41af4",
messagingSenderId: "325133672297",
appId: "1:325133672297:web:b9057b5e030692a9be27f8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };