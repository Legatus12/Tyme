import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

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