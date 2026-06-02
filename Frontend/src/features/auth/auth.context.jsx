import {  createContext ,useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
        const [user,setUser] =useState(null);
        const [loading, setLoading] = useState(false);

        return(
            <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
                {children}
            </AuthContext.Provider>
        )
}






/*
 * File Description:
 * -----------------
 * This file creates and manages the authentication context for the application.
 *
 * Its responsibilities are:
 * 1. Create a global authentication context.
 * 2. Store the currently logged-in user's information.
 * 3. Manage authentication loading state.
 * 4. Provide authentication data to all components.
 * 5. Avoid prop drilling by sharing auth data globally.
 *
 * Context Values:
 *
 * - user
 *   Stores the current logged-in user's data.
 *
 * - setUser
 *   Updates the user information.
 *
 * - loading
 *   Indicates whether an authentication-related operation
 *   is currently in progress.
 *
 * - setLoading
 *   Updates the loading state.
 *
 * Working Flow:
 *
 * AuthProvider
 *       │
 *       ▼
 * AuthContext
 *       │
 *       ▼
 * React Components
 *       │
 *       ▼
 * Access User & Auth State
 *
 * Example:
 *
 * Login Successful
 *       │
 *       ▼
 * setUser(userData)
 *       │
 *       ▼
 * User Data Stored In Context
 *       │
 *       ▼
 * Available Throughout Application
 */