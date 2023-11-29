'use client'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/utils/firebase";


const AuthContext = createContext<any>({user: null, logIn: null, logOut: null})

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)

  const logIn = (user: string, password: string) => {
        signInWithEmailAndPassword(auth, user, password)
  }

  const logOut = () => {
    signOut(auth)
  }


 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    return () => unsubscribe()
 }, [])

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
