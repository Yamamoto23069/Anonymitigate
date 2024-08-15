// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBtjnvQXWfmyBVHuB7q8ZC3VACq5nwV4dE",
    authDomain: "slack-clone-yt-a64e2.firebaseapp.com",
    projectId: "slack-clone-yt-a64e2",
    storageBucket: "slack-clone-yt-a64e2.appspot.com",
    messagingSenderId: "711318416118",
    appId: "1:711318416118:web:4cfec3873da1adc9dedad7",
    measurementId: "G-33ZTRPS19F"
};

// Khởi tạo Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, db, signInWithPopup };
