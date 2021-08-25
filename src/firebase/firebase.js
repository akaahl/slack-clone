import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDTS9ToJmrDZ6E7EIgLEGB4OygFPIeHpKc",
  authDomain: "slack-clone-f978b.firebaseapp.com",
  projectId: "slack-clone-f978b",
  storageBucket: "slack-clone-f978b.appspot.com",
  messagingSenderId: "458962934070",
  appId: "1:458962934070:web:46ea72e3bbed5ba9b3bb97",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
