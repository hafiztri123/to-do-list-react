import { fetcher } from "../../tasks/services/taskService"

export const authService = {
    register: async (user) => {
        return fetcher('auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    },

    login: async (user) => {
        return fetcher('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
}