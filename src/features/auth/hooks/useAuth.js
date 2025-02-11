import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../service/authService"


export const useAuth = () => {

    const register = useMutation({
        mutationFn: (user) => authService.register(user),
        onError: (error) => {
            console.log(error)
        }
    })

    const login = useMutation({
        mutationFn: ({email, password}) => authService.login({email, password}),
        onError : (error) => {
            console.log(error)
        }
    })

    return {
        register: register.mutate,
        registerLoading: register.isLoading,
        registerError: register.error,
        login: login.mutate,
        loginLoading: login.isLoading,
        loginError: login.error
    }
}