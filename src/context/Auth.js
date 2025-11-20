"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";

const Auth = createContext()

const initialState = { isAuth: true, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGIN": return { isAuth: true, user: payload.user }
        case "SET_PROFILE": return { ...state, user: payload.user }
        case "SET_LOGOUT": return initialState
        default: return state
    }
}

const AuthContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = () => {
        setTimeout(() => { setIsAppLoading(false) }, 1000);
    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        dispatch({ type: "SET_LOGOUT" })
    }

    return (
        <Auth.Provider value={{ isAppLoading, ...state, dispatch, handleLogout }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuthContext = () => useContext(Auth)