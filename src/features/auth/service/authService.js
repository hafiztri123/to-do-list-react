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
        const data = await fetcher('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if(!data.data){
            return Error("Invalid credentials")
        }

        return data.data
    }
}