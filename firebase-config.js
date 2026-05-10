// firebase setup - took me a bit to figure out the compat version
// but its easier than the modular one imo

const firebaseConfig = {
  apiKey: "AIzaSyCNZma3tfHcwgJn6e07M6KhYXaBgyrZuzY",
  authDomain: "todo-app-a109d.firebaseapp.com",
  projectId: "todo-app-a109d",
  storageBucket: "todo-app-a109d.firebasestorage.app",
  messagingSenderId: "590114665288",
  appId: "1:590114665288:web:1e0fcba139d8385afdb97d",
  databaseURL: "https://todo-app-a109d-default-rtdb.europe-west1.firebasedatabase.app"
};

// init firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();
