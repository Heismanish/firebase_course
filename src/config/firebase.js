// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// import { GithubAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyA6HNeKLB5gDbFkO-wZz_AoO9qa2caS2XU",
	authDomain: "fir-react-6ee82.firebaseapp.com",
	projectId: "fir-react-6ee82",
	storageBucket: "fir-react-6ee82.appspot.com",
	messagingSenderId: "581588361847",
	appId: "1:581588361847:web:502bdce5eac1eba8d09c72",
	measurementId: "G-R3S5EKEY4L",
};

// const analytics = getAnalytics(app);
// export const githubProvider = new GithubAuthProvider();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = new getFirestore(app);
export const storage = new getStorage(app);
