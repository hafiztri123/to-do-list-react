// features/tasks/components/TaskTest.jsx

import TaskCard from "./TaskCard"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { useTasks } from "../tasks/hooks/useTasks"
import CreateTaskForm from "./CreateTaskForm"


function TaskTest({ selectedCategoryId }) {
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
    } = useTasks()

    
    

    const handleCreateTask = (taskData) => {
        const task = {
            ...taskData,
            status: 'pending'
        }

        createTask({ task })
    }

    const handleEdit = (task) => {
        const updates = {
            title: task.title,
            description: task.description,
            status: task.status,
            due_date: task.due_date
        }
        updateTask({ taskId: task.id, updates })
    }

    const handleDelete = async (task) => {
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
            parent_id: task.parent_id,
            title: task.title,
            description: task.description,
            due_date: new Date().toISOString(),
            status: "pending",
            category_id: task.category_id
        }

        console.log(newTask)

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
        <div className="space-y-6 transition-all duration-300">
            <CreateTaskForm
                onCreateTask={handleCreateTask}
                disabled={isCreating}
            />
            <div className="grid gap-6 transition-all duration-300" >
            {tasks?.filter(task => !selectedCategoryId || task.category_id === selectedCategoryId).map(task => (
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

        </div>
        
    )
}

export default TaskTest