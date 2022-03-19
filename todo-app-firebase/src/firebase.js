import firebase from "firebase"

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDRQZ2Cs5xSqDtTPInf8vFdWtmDq2btvFA",
    authDomain: "todo-dp-react.firebaseapp.com",
    projectId: "todo-dp-react",
    storageBucket: "todo-dp-react.appspot.com",
    messagingSenderId: "823728658967",
    appId: "1:823728658967:web:3357b8eff9a35cfea25a52"
  })

  const db = firebaseApp.firestore();

  export default db;