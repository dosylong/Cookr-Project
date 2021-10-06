import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAT7uexiDxXl0QHR19_-X9i6mIYFnu6eLk",
  authDomain: "cookr-project.firebaseapp.com",
  databaseURL: "https://cookr-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cookr-project",
  storageBucket: "cookr-project.appspot.com",
  messagingSenderId: "106106281543",
  appId: "1:106106281543:web:a8c474cd279038e7309b62",
  measurementId: "G-YQWPW3G974"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();

export { storage, auth, firebase as default };