import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskService } from "../services/taskService"

export const useTasks = () => {
    const queryClient = useQueryClient()

    const sortTasks = (tasks) => {
        return [...tasks].sort((a,b) => {
            if (a.created_at && b.created_at) {
                return new Date(a.created_at) - new Date(b.created_at)
            }

            return a.id - b.id
        })
    }

    const tasksQuery = useQuery({
        queryKey: ['tasks'],
        queryFn: taskService.getTasks,
        select: (data) => ({
            ...data,
            data: sortTasks(data.data)
        })
    })

    const useSubTaskQuery = (parentTaskId) => useQuery({
        queryKey: ['subtasks', parentTaskId],
        queryFn: () => taskService.getSubtasks(parentTaskId),
        select: (data) => ({
            ...data,
            data: sortTasks(data.data)
        }),
        enabled: !!parentTaskId
    })


    const createTaskMutation = useMutation({
        mutationFn: ({ task }) => taskService.createTask(task),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
        }
        
    })

    const updateTaskMutation = useMutation({
        mutationFn: ({ taskId, updates }) => taskService.updateTask(taskId, updates),
        onMutate: async ({ taskId, updates }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries(['tasks'])

            // Get current tasks
            const previousTasks = queryClient.getQueryData(['tasks'])

            // Optimistically update tasks
            queryClient.setQueryData(['tasks'], (old) => {
                const updatedTasks = old.data.map(task => 
                    task.id === taskId ? { ...task, ...updates } : task
                )
                return {
                    ...old,
                    data: sortTasks(updatedTasks)
                }
            })

            return { previousTasks }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousTasks) {
                queryClient.setQueryData(['tasks'], context.previousTasks)
            }
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries(['tasks'])
        }
    })

    const deleteTaskMutation = useMutation({
        mutationFn:({taskId}) => taskService.deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
        }
    })

    

    return {
        tasks: tasksQuery.data?.data || [],
        isLoading: tasksQuery.isLoading,
        error: tasksQuery.error,
        createTask: createTaskMutation.mutate,
        updateTask: updateTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,
        isCreating: createTaskMutation.isLoading,
        isUpdating: updateTaskMutation.isLoading,
        isDeleting: deleteTaskMutation.isLoading,
        useSubTaskQuery
    }



}