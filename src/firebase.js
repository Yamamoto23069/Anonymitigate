// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtjnvQXWfmyBVHuB7q8ZC3VACq5nwV4dE",
    authDomain: "slack-clone-yt-a64e2.firebaseapp.com",
    projectId: "slack-clone-yt-a64e2",
    storageBucket: "slack-clone-yt-a64e2.appspot.com",
    messagingSenderId: "711318416118",
    appId: "1:711318416118:web:4cfec3873da1adc9dedad7",
    measurementId: "G-33ZTRPS19F"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db, signInWithPopup };


