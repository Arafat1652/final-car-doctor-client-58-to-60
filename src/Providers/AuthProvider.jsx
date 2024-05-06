import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null)
     const [loading, setLoading] = useState(true)

     // create user
     const createUser = (email , password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
     }
     // signIn user
     const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
     }
      // logOut user
      const logOut = () =>{
         setLoading(true)
         return signOut(auth)
      }

     useEffect(()=>{

        const unSubscribe = onAuthStateChanged(auth , currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email: userEmail}
            setUser(currentUser)
            setLoading(false)
            console.log('current user',currentUser);
            if(currentUser){
               axios.post('https://car-doctor-server-58-59-60.vercel.app/jwt', loggedUser, {withCredentials: true})
               .then(res => {
                  console.log('token response authP',res.data);
               })
            }
            else{
               axios.post('https://car-doctor-server-58-59-60.vercel.app/logout',loggedUser,{withCredentials:true})
               .then(res => {
                  console.log('token response',res.data);
               })
            }
            })

            return () => {
               return unSubscribe()
            }
         

     }, [user?.email])
     

     const authInfo = {user, loading, createUser, signIn, logOut}
    return (

       
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;