import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, doc, collection, query, where, onSnapshot, addDoc, deleteDoc, updateDoc, orderBy, limit } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

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

export const getTymes = (uid, callback) => onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid)), callback)

export const getTymesInMonth = (uid, month, year, callback) => onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid), where("month", "==", month), where("uid", "==", year)), callback)

export const getTymesInDay = (uid, day, month, year, callback) => onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid), where("day", "==", day), where("month", "==", month), where("year", "==", year)), callback)

export const getIncomingTymes = (uid, callback) => onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid), orderBy("year"), orderBy("month"), orderBy("day"), limit(3)), callback)

export const addTyme = (uid, day, month, year) => addDoc(collection(db, 'tymes'), { title: 'addTest', body: 'addBody', day: day, month: month, year: year, uid: uid})

export const deleteTyme = (id) => deleteDoc(doc(db, 'tymes', id))

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