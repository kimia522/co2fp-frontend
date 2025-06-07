import React from 'react'
import {useContext, createContext, useState} from "react";

const AuthContext = createContext(null);

const AuthProvider = ({user, children}) => {

    const [ AuthD, setAuthData ] = useState(user);
    const setAuth = newUser => {
        if(newUser){
            localStorage.setItem('signed-user', JSON.stringify(newUser));
        }else{
            localStorage.removeItem('signed-user');
        }
        setAuthData(newUser);
    }

    return (
        <AuthContext.Provider value={{AuthD, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}


const useAuth = () => useContext(AuthContext);

export {AuthProvider,useAuth};