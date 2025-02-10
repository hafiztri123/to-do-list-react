import { BASE_HEADERS, fetcher } from "../../tasks/services/taskService";


export const categoryService = {
    getCategories: async () => {
        return fetcher('category', { headers: BASE_HEADERS });
    },

    createCategory: async (category) => {
        return fetcher('category', {
            method: 'POST',
            headers: BASE_HEADERS,
            body: JSON.stringify(category),
        });
    },

    deleteCategory: async (categoryid) => {
        return fetcher(`category/${categoryid}`, {
            method: 'DELETE',
            headers: BASE_HEADERS,
        });
    },

}

export default categoryService