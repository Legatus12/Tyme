import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCneoCJoAptrrMHjfZRqZerfY3Py1nLSpk",
  authDomain: "tyme-app-project.firebaseapp.com",
  projectId: "tyme-app-project",
  storageBucket: "tyme-app-project.appspot.com",
  messagingSenderId: "187320157503",
  appId: "1:187320157503:web:3fd5ca258354f38a0a3f8a",
  measurementId: "G-PFRV7Z7RYK"
})

const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const db = getFirestore(app);

export const getTymesFb = async (userId) => {
  console.log('userId:', userId); // Agregado para debuggear
  const tymesRef = collection(db, "users", userId, "tymes");
  const querySnapshot = await getDocs(tymesRef);
  const tymes = [];
  querySnapshot.forEach((doc) => {
    tymes.push({ id: doc.id, ...doc.data() });
  });
  return tymes;
};

export const addTymeFb = async (userId, tyme) => {
  const userRef = doc(db, "users", userId);
  const tymesRef = collection(userRef, "tymes");

  // Comprueba si la colección ya existe
  const docSnapshot = await getDoc(userRef);
  if (!docSnapshot.exists()) {
    await setDoc(tymesRef.parent, {tymes: []}); // Crea la colección si no existe
  }

  // Agrega el nuevo documento a la colección tymes
  await addDoc(tymesRef, {
    title: tyme.title,
    body: tyme.body,
  });
}

export const deleteTymeFb = async (userId, tymeId) => {
  try {
    const docRef = doc(db, "users", userId, "tymes", tymeId);
    await deleteDoc(docRef);
    console.log('Tyme eliminado correctamente');
  } catch (error) {
    console.log('Error eliminando tyme:', error);
  }
};