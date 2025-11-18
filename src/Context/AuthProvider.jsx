import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userSignUp = (email, password )=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userSignIn = (email,password )=> {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const userSignOut = ()=> {
        setLoading(true)
        return signOut(auth);
    }
    const googleSignIn = ()=> {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //Observer:
   useEffect(()=>{
     const disConnect = onAuthStateChanged(auth, (currentUser)=> {
        setUser(currentUser)
        setLoading(false)
     })
    //  disconnect:
    return ()=> {
        disConnect();
    }
   }, [])


    const authInfo = {
        userSignUp,
        userSignIn,
        userSignOut,
        user,
        setUser,
        loading,
        setLoading,
        googleSignIn,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;