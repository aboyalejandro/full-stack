import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCsWtrTP2Y3eh3pWQLYM75m7g3bvQBIh5M",
    authDomain: "facebook-messenger-clone-a75e5.firebaseapp.com",
    projectId: "facebook-messenger-clone-a75e5",
    storageBucket: "facebook-messenger-clone-a75e5.appspot.com",
    messagingSenderId: "597812824724",
    appId: "1:597812824724:web:ebc114eeeb7f67c3584281"
  });

const db = firebaseApp.firestore();
export default db; 