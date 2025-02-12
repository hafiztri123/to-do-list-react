import { BASE_URL} from "../../../constant/api";

export const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
});
export async function fetcher(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options); 

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(`${errorData.Message}`);
    }

    

    if (response.status !== 204) {
        return response.json();
    }
    
    return null; 
}

export const taskService = {
    getTasks: async () => {
        return fetcher('tasks', { headers: getHeaders() });
    },

    getSubtasks: async (taskid) => {
        return fetcher(`tasks/${taskid}/subtasks`, { headers: getHeaders() });
    },

    createTask: async (task) => {
        return fetcher('tasks', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(task),
        });
    },

    updateTask: async (taskid, updates) => {
        return fetcher(`tasks/${taskid}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updates),
        });
    },

    deleteTask: async (taskid) => {
        return fetcher(`tasks/${taskid}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
    }
};
