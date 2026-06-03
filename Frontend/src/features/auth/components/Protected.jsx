import { useAuth } from "../hooks/useAuth";
import { useNavigate ,Navigate } from "react-router";

import React from 'react'

const Protected = ({children}) => {

const {user,loading} = useAuth();
const navigate= useNavigate();

if(loading){
    return(
        <main>
            <h1>Loading.....</h1>
        </main>
    )
}

if(!user){
   return <Navigate to={'/login'}/>
}

  return children;
}

export default Protected




/*
 * File Description:
 * -----------------
 * This file implements a Protected Route component.
 *
 * Its responsibilities are:
 * 1. Restrict access to authenticated users only.
 * 2. Check the user's authentication status.
 * 3. Display a loading state while authentication is being verified.
 * 4. Redirect unauthenticated users to the login page.
 * 5. Allow authenticated users to access protected content.
 *
 * Authentication Flow:
 *
 * User Visits Protected Route
 *          │
 *          ▼
 * Check Authentication State
 *          │
 *          ▼
 * loading === true ?
 *          │
 *     Yes ─────► Show Loading Screen
 *          │
 *     No
 *          │
 *          ▼
 * user exists ?
 *          │
 *     No ─────► Redirect To Login Page
 *          │
 *     Yes
 *          │
 *          ▼
 * Render Protected Content
 *
 * Example Protected Pages:
 * - Dashboard
 * - Profile
 * - Settings
 * - Chat Page
 * - AI Workspace
 *
 * Purpose:
 *
 * This component prevents unauthorized users from accessing
 * pages that require authentication.
 *
 * Example:
 *
 * <Protected>
 *    <Dashboard />
 * </Protected>
 *
 * If the user is logged in:
 *    Dashboard is displayed.
 *
 * If the user is not logged in:
 *    User is redirected to /login.
 */