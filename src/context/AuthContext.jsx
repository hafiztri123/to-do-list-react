import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const navigate = useNavigate()
    

    const login = (token) => {
        const tokenString = "Bearer " + token
        localStorage.setItem('token', tokenString)

        setIsAuthenticated(true)
        navigate('/tasks')
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        navigate('/auth')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}