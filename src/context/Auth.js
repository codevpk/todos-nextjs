"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const Auth = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGIN": return { isAuth: true, user: payload.user }
        case "SET_PROFILE": return { ...state, user: payload.user }
        case "SET_LOGOUT": localStorage.removeItem("token"); return initialState
        default: return state
    }
}

const AuthContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = () => {
        const token = localStorage.getItem("token")
        if (!token) { setIsAppLoading(false); return }

        axios.get("/api/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                const { user } = data
                dispatch({ type: "SET_LOGIN", payload: { user } })
            })
            .catch(err => {
                console.error(err)
                console.log(err.response?.data?.error || "Failed to fetch profile")
            })
            .finally(() => {
                setIsAppLoading(false)
            })
    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => dispatch({ type: "SET_LOGOUT" })

    return (
        <Auth.Provider value={{ isAppLoading, ...state, dispatch, handleLogout, readProfile }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuthContext = () => useContext(Auth)