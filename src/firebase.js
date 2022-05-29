// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbkwn07MHvt9w1rnsQ41dO6Xm919pNwZM',
  authDomain: 'start-react-e00f1.firebaseapp.com',
  projectId: 'start-react-e00f1',
  storageBucket: 'start-react-e00f1.appspot.com',
  messagingSenderId: '567950133721',
  appId: '1:567950133721:web:5ac6d9141009edeb60b1c8',
  measurementId: 'G-4K3NYCPTV4',
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
