import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9t66y4qpZlb58oTJ5hZ-fXjc2dm42HX0",
  authDomain: "major-70ddf.firebaseapp.com",
  projectId: "major-70ddf",
  storageBucket: "major-70ddf.appspot.com",
  messagingSenderId: "378933308164",
  appId: "1:378933308164:web:619c1bcdc5959c4ee33e51",
  measurementId: "G-H3K6YNT4WM",
};

// Initialize Firebase
const googleProvider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export { googleProvider };

// Import the functions you need from the SDKs you need
