import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCbo6OB9BH9sC7rQr6zUNZ52AhwWIH3aiU",
    authDomain: "clone-d5220.firebaseapp.com",
    projectId: "clone-d5220",
    storageBucket: "clone-d5220.appspot.com",
    messagingSenderId: "31858437015",
    appId: "1:31858437015:web:8e28bdd47dad47a56e72d2",
    measurementId: "G-6X6BVJF0Q7"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();
const auth = firebase.auth();

export { db, auth };