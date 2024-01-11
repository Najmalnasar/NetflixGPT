// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA85psAtNjVg9eXNJuZCtsmNxLnDTbCBrA",
    authDomain: "netflixgpt-91a05.firebaseapp.com",
    projectId: "netflixgpt-91a05",
    storageBucket: "netflixgpt-91a05.appspot.com",
    messagingSenderId: "789392491464",
    appId: "1:789392491464:web:8a0f62a712d8c2f5dfb6fd",
    measurementId: "G-21C68FCHLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

