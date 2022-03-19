const firebaseConfig = {
  apiKey: "AIzaSyChMrQAZixVyFQQgAnP3fbec_jGuqktDhI",
  authDomain: "to-do-list-304f3.firebaseapp.com",
  projectId: "to-do-list-304f3",
  storageBucket: "to-do-list-304f3.appspot.com",
  messagingSenderId: "834309114433",
  appId: "1:834309114433:web:a130b75725238fe34b14c0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();