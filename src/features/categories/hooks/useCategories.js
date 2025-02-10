import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import categoryService from "../service/categoryService"



export const useCategories = () => {
    const queryClient = useQueryClient()

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getCategories
    })

    const createCategoryMutation = useMutation({
        mutationFn: (categoryName) => {console.log(categoryName); return categoryService.createCategory(categoryName)},
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const deleteCategoryMutation = useMutation({
        mutationFn: (category_id) => categoryService.deleteCategory(category_id),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
        },
        onError: (error) => {
            console.log(error)
        }

    })

    return {
        categories: categoriesQuery.data?.data || [],
        isLoading: categoriesQuery.isLoading,
        error: categoriesQuery.error,
        createCategory: createCategoryMutation.mutate,
        isCreating: createCategoryMutation.isLoading,
        deleteCategory: deleteCategoryMutation.mutate,
        isDeleting: deleteCategoryMutation.isLoading,
    }
}