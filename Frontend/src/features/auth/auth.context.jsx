import {  createContext ,useState,useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();



export const AuthProvider = ({children}) =>{
        const [user,setUser] =useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          const getAndSetUser = async ()=>{
            const data = await getMe();
            setUser(data.user);
            setLoading(false);

          }
          getAndSetUser();
        
         
        }, [])
        

        return(
            <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
                {children}
            </AuthContext.Provider>
        )
}






/*
 * File Description:
 * -----------------
 * This file creates and manages the global authentication state
 * for the entire React application using Context API.
 *
 * Its responsibilities are:
 * 1. Create the AuthContext.
 * 2. Store the currently authenticated user's information.
 * 3. Manage authentication loading state.
 * 4. Make authentication data available to all components.
 * 5. Automatically check if a user is already logged in when
 *    the application starts.
 * 6. Prevent prop drilling by providing auth data globally.
 *
 * Context Values:
 *
 * - user
 *   Stores information about the currently logged-in user.
 *
 * - setUser
 *   Updates the user state.
 *
 * - loading
 *   Indicates whether authentication data is being loaded.
 *
 * - setLoading
 *   Updates the loading state.
 *
 * Initial Authentication Check:
 *
 * When the application loads:
 *
 * App Start
 *      │
 *      ▼
 * AuthProvider Mounted
 *      │
 *      ▼
 * useEffect Executes
 *      │
 *      ▼
 * getMe() API Call
 *      │
 *      ▼
 * Backend Verifies Cookie Token
 *      │
 *      ▼
 * User Found?
 *      │
 *  Yes ─────► Store User In Context
 *      │
 *  No ──────► user = null
 *      │
 *      ▼
 * loading = false
 *
 * Working Flow:
 *
 * AuthProvider
 *      │
 *      ▼
 * AuthContext
 *      │
 *      ▼
 * React Components
 *      │
 *      ▼
 * Access User & Authentication State
 *
 * Purpose:
 *
 * This ensures that when the user refreshes the page,
 * the application can automatically determine whether
 * the user is already logged in and restore the user state.
 */