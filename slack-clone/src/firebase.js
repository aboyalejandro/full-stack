import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD-nnp9_LEgZH7KEUEWmc5MW1j6liFGMBA",
    authDomain: "slack-clone-7b462.firebaseapp.com",
    projectId: "slack-clone-7b462",
    storageBucket: "slack-clone-7b462.appspot.com",
    messagingSenderId: "833729418976",
    appId: "1:833729418976:web:3e5ded0499e9c979bfa285"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, db} 