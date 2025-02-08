// features/tasks/components/TaskTest.jsx

import { useQuery } from "@tanstack/react-query"
import { BASE_URL, TOKEN } from "../../constant/api"
import TaskCard from "./TaskCard"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { useTasks } from "../tasks/hooks/useTasks"


function TaskTest() {
    const {
        tasks,
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask,
        isCreating,
        isUpdating,
        isDeleting,
        useSubTaskQuery,
    } = useTasks()

    
    


    const handleEdit = (task) => {
        const updates = {
            title: task.title + ' (edited)',
            description: task.description,
            status: task.status,
            due_date: task.due_date
        }
        updateTask({ taskId: task.id, updates })
    }

    const handleDelete = async (task) => {
        console.log(task)
        if (window.confirm('Are you sure you want to delete this task?')) {
            try{
                await deleteTask({taskId: task.id})
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleAddSubtask = (task) => {
        const newTask = {
            parent_id: task.id,
            title: "New Subtask",
            description: "Description for new subtask",
            due_date: new Date().toISOString(),
            status: "pending"
        }

        createTask({ task: newTask })
    }


    if (isLoading) return <div>Loading tasks...</div>
    if (error) return (
        <Alert variant="destructive">
            <AlertDescription>
                Error loading tasks: {error.message}
            </AlertDescription>
        </Alert>
    )


    return (
        <div className="grid gap-6">
            {tasks?.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddSubtask={handleAddSubtask}
                    disabled={isCreating || isUpdating || isDeleting}
                />
            ))}
    
        </div>
    )
}

export default TaskTest