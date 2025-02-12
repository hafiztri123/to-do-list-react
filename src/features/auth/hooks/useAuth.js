import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../service/authService"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuthContext } from "../../../context/AuthContext"
import { useState } from "react"

export const useAuth = () => {
    const { login: contextLogin } = useAuthContext()
    const [formError, setFormError] = useState('')


    const register = useMutation({
        mutationFn: (user) => authService.register(user),
        onSuccess: () => {
            toast.success("Registration succesfull! Please login to continue", {
                duration: 4000
            }),
            setFormError('')
        },
        onError: (error) => {
            setFormError(error.message)
            toast.error(error.message || 'Registration failed. Please try again.', {
                duration: 4000
            })
        }
    })

    const login = useMutation({
        mutationFn: ({email, password}) => authService.login({email, password}),
        onSuccess: (token) => {
            contextLogin(token)
            toast.success('Welcome back!', {
                duration: 2000
            })
            setFormError('')
        },
        onError : (error) => {
            setFormError(error.message)
            toast.error(error.message || 'Invalid email or password', {
                duration: 4000
            })
        }
    })

    return {
        register: register.mutate,
        registerLoading: register.isLoading,
        registerError: register.error,
        formError,
        setFormError,
        login: login.mutate,
        loginLoading: login.isLoading,
        loginError: login.error,
    }
}