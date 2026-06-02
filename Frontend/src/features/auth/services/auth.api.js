import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export async function register({ username, email, password }) {


    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data;

    } catch (err) {
        console.log(err);
    }

}

export async function login({ email, password }) {


    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })

        return response.data;

    } catch (err) {
        console.log(err);
    }

}

export async function logout() {


    try {
        const response = await api.get('/api/auth/logout');

        return response.data;

    } catch (err) {
        console.log(err);
    }

}

export async function getMe() {


    try {
        const response = await api.get('/api/auth/get-me')

        return response.data;

    } catch (err) {
        console.log(err);
    }

}



/*
 * File Description:
 * -----------------
 * This file is used to connect the frontend (React) with the backend server.
 *
 * Its responsibilities are:
 * 1. Send requests from the frontend to the backend.
 * 2. Handle user authentication requests.
 * 3. Automatically send login cookies with requests.
 * 4. Return server responses to React components.
 * 5. Keep all API-related code in one place.
 *
 * Available Functions:
 *
 * - register()
 *   Registers a new user.
 *
 * - login()
 *   Logs in an existing user.
 *
 * - logout()
 *   Logs out the current user.
 *
 * - getMe()
 *   Gets information about the currently logged-in user.
 *
 * Important:
 * - withCredentials: true
 *   Allows the browser to send authentication cookies
 *   along with requests to the backend.
 *
 * Working Flow:
 *
 * React Component
 *       │
 *       ▼
 * API Function (register/login/logout/getMe)
 *       │
 *       ▼
 * Backend Server
 *       │
 *       ▼
 * Database
 *       │
 *       ▼
 * Response Back To React
 */