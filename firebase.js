// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARW5tMVZwZ7DgPJFCqifdlbO7vQlfBBwA",
  authDomain: "tyme-project.firebaseapp.com",
  projectId: "tyme-project",
  storageBucket: "tyme-project.appspot.com",
  messagingSenderId: "511638176759",
  appId: "1:511638176759:web:41a3495d2798d2eb4ee4f2",
  measurementId: "G-907Z3THBZW"
};
  

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore()
//CRUD
