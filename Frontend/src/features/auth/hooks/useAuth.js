import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from '../services/auth.api';


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        const data = await login({ email, password });
        setUser(data.user);
        setLoading(false);
    }

    const handleRegister = async ({ username,email, password }) => {
        setLoading(true);
        const data = await register({username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    }

    return {user,loading,handleLogin,handleRegister,handleLogout};
}



/*
 * File Description:
 * -----------------
 * This file contains a custom authentication hook (useAuth).
 *
 * Its responsibilities are:
 * 1. Access authentication data from AuthContext.
 * 2. Manage user authentication actions.
 * 3. Handle login requests.
 * 4. Handle user registration requests.
 * 5. Handle logout requests.
 * 6. Manage loading state during API calls.
 * 7. Update global user data after authentication actions.
 *
 * Available Functions:
 *
 * - handleLogin()
 *   Logs in a user and stores user information in AuthContext.
 *
 * - handleRegister()
 *   Registers a new user and stores user information in AuthContext.
 *
 * - handleLogout()
 *   Logs out the current user and clears user information.
 *
 * Available State:
 *
 * - user
 *   Contains the currently logged-in user's information.
 *
 * - loading
 *   Indicates whether an authentication request is in progress.
 *
 * Working Flow:
 *
 * React Component
 *       │
 *       ▼
 * useAuth()
 *       │
 *       ▼
 * Authentication Function
 *       │
 *       ▼
 * API Request
 *       │
 *       ▼
 * Backend Server
 *       │
 *       ▼
 * Response
 *       │
 *       ▼
 * Update AuthContext
 *       │
 *       ▼
 * Re-render Components
 *
 * Example:
 *
 * User Clicks Login
 *       │
 *       ▼
 * handleLogin()
 *       │
 *       ▼
 * login API Call
 *       │
 *       ▼
 * User Data Received
 *       │
 *       ▼
 * setUser(data.user)
 *       │
 *       ▼
 * User Available Throughout Application
 */