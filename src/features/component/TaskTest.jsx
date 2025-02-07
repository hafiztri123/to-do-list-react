// features/tasks/components/TaskTest.jsx

import { useQuery } from "@tanstack/react-query"
import { BASE_URL, TOKEN } from "../../constant/api"
import TaskCard from "./TaskCard"

function TaskTest() {
    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(BASE_URL + `/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
        }).then(res => res.json())
    })

    if (isLoading) return <div>Loading...</div>

    const handleEdit = (taskId) => {
        alert("Edit task:", taskId)
    }

    const handleDelete = (taskId) => {
        alert("Delete task:", taskId)
    }

    const handleAddSubtask = (taskId) => {
        alert("Add subtask to task:", taskId)
    }

    return (
        <div className="grid gap-6">
            {tasks?.data?.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddSubtask={handleAddSubtask}
                />
            ))}
    
        </div>
    )
}

export default TaskTest