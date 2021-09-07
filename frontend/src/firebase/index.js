import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCTfcI41rfLYDXFd_mMkgKHmU6Vp9EzrRs",
  authDomain: "icafsl.firebaseapp.com",
  projectId: "icafsl",
  storageBucket: "icafsl.appspot.com",
  messagingSenderId: "65440105589",
  appId: "1:65440105589:web:e0c6de6b8457e1cfc4643c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
