import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBDquRrmfgtuqPP8lD6KxGIeMjDvXM6zgk",
    authDomain: "clothing-ecommerce-fb3b5.firebaseapp.com",
    databaseURL: "https://clothing-ecommerce-fb3b5.firebaseio.com",
    projectId: "clothing-ecommerce-fb3b5",
    storageBucket: "clothing-ecommerce-fb3b5.appspot.com",
    messagingSenderId: "357739459636",
    appId: "1:357739459636:web:1a93b83aeedbf195550661",
    measurementId: "G-N6VG61M1Z6"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;