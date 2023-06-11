import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, doc, collection, query, where, onSnapshot, addDoc, deleteDoc, updateDoc, orderBy, limit, getDoc, setDoc } from 'firebase/firestore'
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

//

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1) //obtenemos el dia de mañana
tomorrow.setHours(0, 0, 0, 0) //establecemos el dia de mañana en la hora 00:00

const tymesRef = collection(db, 'tymes')
const notesRef = collection(db, 'notes')
const habitsRef = collection(db, 'habits')
const projectsRef = collection(db, 'projects')

//

export const getTymes = (uid, callback) => onSnapshot(query(tymesRef, where("uid", "==", uid)), callback)

export const getTymesInMonth = (uid, month, year, callback) => onSnapshot(query(tymesRef, where("uid", "==", uid), where("month", "==", month), where("uid", "==", year)), callback)

export const getTymesInDay = (uid, date, callback) => onSnapshot(query(tymesRef, where("uid", "==", uid), where("date", "==", date)), callback)

export const getIncomingTymes = (uid, callback) => onSnapshot(query(tymesRef, where("uid", "==", uid), where("timestamp", ">=", tomorrow.getTime()), orderBy('timestamp'), limit(3)), callback)

export const getTymesByProject = (uid, project, callback) => onSnapshot(query(tymesRef, where("uid", "==", uid), where("project", "==", project)), callback)

export const addTyme = (uid, title, body, date, timestamp) => addDoc(tymesRef, { uid: uid, title: title, body: body, date: date, timestamp: timestamp})

export const deleteTyme = (id) => deleteDoc(doc(db, 'tymes', id))

export const updateTyme = (id, tyme) => updateDoc(doc(db, 'tymes', id), tyme)


export const addNote = (uid, title, text) => addDoc(notesRef, { uid: uid, title: title, text: text})

export const getNotes = (uid, callback) => onSnapshot(query(notesRef, where("uid", "==", uid)), callback)

export const deleteNoteFB = (id) =>{ 
  deleteDoc(doc(db, 'notes', id))
}

export const addHabit = (uid, name, description) => addDoc(habitsRef, { uid: uid, name: name, description: description, completed: []})

export const getHabits = (uid, callback) => onSnapshot(query(habitsRef, where("uid", "==", uid)), callback)

export const deleteHabitFB = (id) =>{ 
  deleteDoc(doc(db, 'habits', id))
}
export const addProject = (uid, name, description) => addDoc(projectsRef, { uid: uid, name: name, description: description})

export const getProjects = (uid, callback) => onSnapshot(query(projectsRef, where("uid", "==", uid)), callback)

export const deleteProjectFB = (id) =>{ 
  deleteDoc(doc(db, 'projects', id))
}

export const setProjectInTyme = async (tymeId, projectId) => {
  console.log('HOLAAA')
  const tymeRef = doc(db, 'tymes', tymeId);
  const tymeDoc = await getDoc(tymeRef);
  if (!tymeDoc.exists()) {
    await setDoc(tymeRef, { project: projectId });
  } else {
    await updateDoc(tymeRef, { project: projectId });
  }
  console.log('Campo "project" añadido o actualizado correctamente en el documento "tyme"');
};
/** 
export const getProjects = (uid, callback) => {
  onSnapshot(
    query(projectsRef, where("uid", "==", uid)),
    (snapshot) => {
      const projects = snapshot.docs.map((doc) => doc.data().list);
      callback(projects);
    }
  );
};


*/

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