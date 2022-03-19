import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC_BZoIuJRgOLVH1z9tk-A5lGU5qcgRBTw",
    authDomain: "whatsapp-clone-a3576.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-a3576-default-rtdb.firebaseio.com",
    projectId: "whatsapp-clone-a3576",
    storageBucket: "whatsapp-clone-a3576.appspot.com",
    messagingSenderId: "462142964803",
    appId: "1:462142964803:web:450567014332a66f6980f6"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}
