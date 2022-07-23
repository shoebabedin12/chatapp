// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV06SH6h7SIXvczE6iNj0YceE8TRrcwYU",
  authDomain: "techtalk-b7a07.firebaseapp.com",
  projectId: "techtalk-b7a07",
  storageBucket: "techtalk-b7a07.appspot.com",
  messagingSenderId: "515523349656",
  appId: "1:515523349656:web:f338d2a6522c65dacdd4ed",
  measurementId: "G-TKYYLC42T1",
  databaseURL: "https://techtalk-b7a07-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default firebaseConfig;