import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, doc, collection, query, where, onSnapshot, addDoc, deleteDoc, updateDoc, orderBy, limit, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
//import { getMessaging, getToken } from "firebase/messaging"
//import { requestPermission } from "./firebase-messaging-sw"
import { isSameDay, format } from 'date-fns'
 
export const app = initializeApp({
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

export const db = getFirestore(app)


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

export const addTyme = (uid, title, body, date, timestamp, project) =>{
  if(project !== '')
    addDoc(tymesRef, { uid: uid, title: title, body: body, date: date, timestamp: timestamp, done: false, project: project })
  else  
    addDoc(tymesRef, { uid: uid, title: title, body: body, date: date, timestamp: timestamp, done: false })
}

export const deleteTyme = (id) => deleteDoc(doc(db, 'tymes', id))

export const deleteTymeByProject = async (uid, project) => (await getDocs(query(tymesRef, where("uid", "==", uid), where('project', '==', project)))).forEach((doc) => deleteDoc(doc.ref))

export const updateTyme = (id, tyme) => updateDoc(doc(db, 'tymes', id), tyme)

export const updateTymeField = (id, field, value) => {
  updateDoc(doc(db, 'tymes', id), { [field]: value })
    .then(() => console.log('Campo actualizado exitosamente'))
    .catch((error) => console.error('Error al actualizar el campo:', error))
}

export const addNote = (uid, text, timestamp) => addDoc(notesRef, { uid: uid, text: text, timestamp: timestamp })

export const deleteNoteFB = (id) => {
  deleteDoc(doc(db, 'notes', id))
}

export const addHabit = (uid, name) => addDoc(habitsRef, { uid: uid, name, completed: [], next: [], recur: [] })
/**
export const updateHabit = (id, habit) => {
  console.log(habit)
  updateDoc(doc(db, 'habits', id))
} 
 */
export const updateHabit = (id, habit) => {
  const habitRef = doc(db, 'habits', id);
  const updatedData = { name: habit.name }; // Nuevos datos con el campo "name" actualizado

  return updateDoc(habitRef, updatedData)
    .then(() => {
      console.log('Documento actualizado correctamente');
    })
    .catch((error) => {
      console.error('Error al actualizar el documento:', error);
    });
};

export const getHabitById = (habitId, callback) => {
  const habitRef = doc(habitsRef, habitId)
  const unsubscribe = onSnapshot(habitRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({ id: snapshot.id, ...snapshot.data() })
    } else {
      callback(null) // El hábito no existe
    }
  })

  // Devolvemos la función de cancelación de la suscripción
  return unsubscribe
}

export const deleteHabitFB = (id) => {
  deleteDoc(doc(db, 'habits', id))
}
export const addProject = (uid, name) => addDoc(projectsRef, { uid: uid, name })

export const deleteProjectFB = (id) => {
  deleteDoc(doc(db, 'projects', id))
}

export const addTymeFb = async (userId, tyme) => {
  const userRef = doc(db, "users", userId)
  const tymesRef = collection(userRef, "tymes")

  // Comprueba si la colección ya existe
  const docSnapshot = await getDoc(userRef)
  if (!docSnapshot.exists()) {
    await setDoc(tymesRef.parent, { tymes: [] }) // Crea la colección si no existe
  }

  // Agrega el nuevo documento a la colección tymes
  await addDoc(tymesRef, {
    title: tyme.title,
    body: tyme.body,
  })
}

export const handleCompletedHabitDays = async (userId, habitId, date) => {
  const queryRef = query(habitsRef, where('uid', '==', userId))
  const querySnapshot = await getDocs(queryRef)

  if (!querySnapshot.empty) {
    const habitRef = doc(db, 'habits', habitId)
    const habitDoc = querySnapshot.docs.find(doc => doc.id === habitId)
    if (habitDoc) {
      const completedArray = habitDoc.get('completed') || []
      console.log(completedArray)
      if (!completedArray.some(completed => completed === date)){
        await updateDoc(habitRef, { completed: [...completedArray, date] })
        console.log('COMPLETED AÑADIDO')
      }
      else{
        const updatedArray = completedArray.filter(completed => completed !== date)
        await updateDoc(habitRef, { completed: updatedArray })
      }
      console.log('COMPLETED agregada con éxito al campo "completed".')
    } else {
      console.log('El documento no existe en la colección "habits".')
    }
  } else {
    console.log('No se encontraron documentos en la colección "habits" para el usuario especificado.')
  }
}

export const handleNextHabitDays = async (userId, habitId, date) => {
  const queryRef = query(habitsRef, where('uid', '==', userId))
  const querySnapshot = await getDocs(queryRef)

  if (!querySnapshot.empty) {
    const habitRef = doc(db, 'habits', habitId)
    const habitDoc = querySnapshot.docs.find(doc => doc.id === habitId)
    if (habitDoc) {
      const nextArray = habitDoc.get('next') || []
      if (!nextArray.some(next => next === date)){
        await updateDoc(habitRef, { next: [...nextArray, date] })
        console.log('DIA AÑADIDO A NEXT')
      }
      else{
        const updatedArray = nextArray.filter(next => next !== date)
        await updateDoc(habitRef, { next: updatedArray })
      }
      console.log('NEXT agregada con éxito al campo "completed".')
    } else {
      console.log('El documento no existe en la colección "habits".')
    }
  } else {
    console.log('No se encontraron documentos en la colección "habits" para el usuario especificado.')
  }

}
export const handleRecurHabitDays = async (userId, habitId, num) => {
  const queryRef = query(habitsRef, where('uid', '==', userId))
  const querySnapshot = await getDocs(queryRef)

  if (!querySnapshot.empty) {
    const habitRef = doc(db, 'habits', habitId)
    const habitDoc = querySnapshot.docs.find(doc => doc.id === habitId)
    if (habitDoc) {
      const recurArray = habitDoc.get('recur') || []
      if (!recurArray.some(recur => recur === num)){
        await updateDoc(habitRef, { recur: [...recurArray, num] })
        console.log('DIA AÑADIDO A RECUR')
      }
      else{
        const updatedArray = recurArray.filter(recur => recur !== num)
        await updateDoc(habitRef, { recur: updatedArray })
      }
      console.log('RECUR agregada con éxito al campo "RECUR".')
    } else {
      console.log('El documento no existe en la colección "habits".')
    }
  } else {
    console.log('No se encontraron documentos en la colección "habits" para el usuario especificado.')
  }

}