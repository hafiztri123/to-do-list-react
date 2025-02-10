import { BASE_URL, TOKEN } from "../../../constant/api";

export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
};

export async function fetcher(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options); 

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`[${errorData.code}] ${errorData.message}`);
    }

    // Only try to parse JSON if there's content
    if (response.status !== 204) {
        return response.json();
    }
    
    return null; // For 204 No Content responses
}

export const taskService = {
    getTasks: async () => {
        return fetcher('tasks', { headers: BASE_HEADERS });
    },

    getSubtasks: async (taskid) => {
        return fetcher(`tasks/${taskid}/subtasks`, { headers: BASE_HEADERS });
    },

    createTask: async (task) => {
        return fetcher('tasks', {
            method: 'POST',
            headers: BASE_HEADERS,
            body: JSON.stringify(task),
        });
    },

    updateTask: async (taskid, updates) => {
        return fetcher(`tasks/${taskid}`, {
            method: 'PUT',
            headers: BASE_HEADERS,
            body: JSON.stringify(updates),
        });
    },

    deleteTask: async (taskid) => {
        return fetcher(`tasks/${taskid}`, {
            method: 'DELETE',
            headers: BASE_HEADERS,
        });
    }
};
