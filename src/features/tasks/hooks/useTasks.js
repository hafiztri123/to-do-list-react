import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taskService } from "../services/taskService"

export const useTasks = () => {
    const queryClient = useQueryClient()

    const tasksQuery = useQuery({
        queryKey: ['tasks'],
        queryFn: taskService.getTasks
    })

    const useSubTaskQuery = (parentTaskId) => useQuery({
        queryKey: ['subtasks', parentTaskId],
        queryFn: () => taskService.getSubtasks(parentTaskId),
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
        onSuccess: () => {
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