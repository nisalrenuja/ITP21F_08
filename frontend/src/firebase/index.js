import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDSf2hLIztSSmBWNiFBoGId1Qj_hENUNbE",
  authDomain: "fir-review-pdf.firebaseapp.com",
  projectId: "fir-review-pdf",
  storageBucket: "fir-review-pdf.appspot.com",
  messagingSenderId: "70833646732",
  appId: "1:70833646732:web:7fb3c9265f77ae1ce5dfa9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
