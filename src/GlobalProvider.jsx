import React, { createContext, useState, useEffect } from 'react'
import { auth, getTymes } from '../firebase'
import startOfToday from 'date-fns/startOfToday'
import { getDocs, query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useTranslation } from 'react-i18next'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

  const { t } = useTranslation()

  const [user, setUser] = useState(null)
  const [tymes, setTymes] = useState([])
  const [projects, setProjects] = useState([])
  const [habits, setHabits] = useState([])
  const [notes, setNotes] = useState([])

  const [loadingTymes, setLoadingTymes] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingHabits, setLoadingHabits] = useState(true)
  const [loadingNotes, setLoadingNotes] = useState(true)

  //

  const loadTymes = async(uid) => {
    const fetchData = () => {
      try {
        return new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid)), (docs) => {
            const data = []
            docs.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() })
            })
            resolve(setTymes(data))
          })
    
          return () => {
            unsubscribe()
          }
        })
      } catch (error) { console.log(error) }
    }
    
    await fetchData()
    setLoadingTymes(false)
  }

  const loadProjects = async(uid) => {
    const fetchData = () => {
      try {
        return new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(query(collection(db, 'projects'), where("uid", "==", uid)), (docs) => {
            const data = []
            console.log('snap proj')
            docs.forEach(async(doc) => {
              let number = 0
              let done = 0
              const fetchNumbers = () => {
                try {
                  return new Promise((resolve, reject) => {
                    const unsubscribe = onSnapshot(query(collection(db, 'tymes'), where("uid", "==", uid), where("project", "==", doc.data().name)), (docs) => {
                      console.log('snap tyme')
                      docs.forEach((doc) => {
                        number ++
                        doc.data().done ? done ++ : 0
                      })
                      resolve()
                    })
              
                    return () => {
                      unsubscribe()
                    }
                  })
                } catch (error) { console.log(error) }
              }
              await fetchNumbers()
              data.push({ id: doc.id, ...doc.data(), number, done })
            })
            resolve(setProjects(data))
          })
    
          return () => {
            unsubscribe()
          }
        })
      } catch (error) { console.log(error) }
    }
    
    await fetchData()
    setLoadingProjects(false)
  }

  const loadHabits = async(uid) => {
    const fetchData = () => {
      try {
        return new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(query(collection(db, 'habits'), where("uid", "==", uid)), (docs) => {
            const data = []
            docs.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() })
            })
            resolve(setHabits(data))
          })
    
          return () => {
            unsubscribe()
          }
        })
      } catch (error) { console.log(error) }
    }
    
    await fetchData()
    setLoadingHabits(false)
  }

  const loadNotes = async(uid) => {
    const fetchData = () => {
      try {
        return new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(query(collection(db, 'notes'), where("uid", "==", uid)), (docs) => {
            const data = []
            docs.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() })
            })
            resolve(setNotes(data))
          })
    
          return () => {
            unsubscribe()
          }
        })
      } catch (error) { console.log(error) }
    }
    
    await fetchData()
    setLoadingNotes(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user)
        loadTymes(user.uid)
        loadProjects(user.uid)
        loadHabits(user.uid)
        loadNotes(user.uid)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  //

  const values = {
    user,
    tymes,
    loadingTymes,
    projects,
    loadingProjects,
    habits,
    loadingHabits,
    notes,
    loadingNotes
  }

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  )

}

export { GlobalContext, GlobalProvider }