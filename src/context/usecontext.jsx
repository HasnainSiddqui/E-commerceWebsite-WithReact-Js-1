import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";



export let UserIsLogin = createContext();

export let loaderContext = createContext()




let AuthContextProvide = ({ children }) => {

    let [loader, setLoader] = useState(true)

    let [user, setUser] = useState({
        isLogin: false,
        userObj: {},
    })

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ isLogin: true, ...firebaseUser })
              


            } else {
                setUser({ isLogin: false, userObj: {} })

            }
        });

    }, [])
   


    return (
        <loaderContext.Provider value={{ loader, setLoader }}>
            <UserIsLogin.Provider value={{ user, setUser }}>
               

                {children}

          
            </UserIsLogin.Provider>
        </loaderContext.Provider>
    )
}

export default AuthContextProvide;