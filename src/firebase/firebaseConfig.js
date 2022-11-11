import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEJto5EBExGWg5-CZxmsaQqy8H0AW2800',
  authDomain: 'bookclub-d3d4a.firebaseapp.com',
  projectId: 'bookclub-d3d4a',
  storageBucket: 'bookclub-d3d4a.appspot.com',
  messagingSenderId: '593970031891',
  appId: '1:593970031891:web:3f9d206e2a547bccaf3ee6',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;

export { auth, db, timestamp };
