import { getHeaders, fetcher } from "../../tasks/services/taskService";


export const categoryService = {
    getCategories: async () => {
        return fetcher('category', { headers: getHeaders() });
    },

    createCategory: async (category) => {
        return fetcher('category', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(category),
        });
    },

    deleteCategory: async (categoryid) => {
        return fetcher(`category/${categoryid}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
    },

}

export default categoryService