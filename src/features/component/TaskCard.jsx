import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronRight, Plus, Pencil, Trash } from "lucide-react"

const TaskCard = ({ task, onEdit, onDelete, onAddSubtask}) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()){
            case 'completed':
                return `bg-green-100 text-green-800`
            case 'pending':
                return `bg-yellow-100 text-yellow-800`
            default:
                return `bg-gray-100 text-gray-800`
        }
    }

    return (
        <div>
            <Card className="w=full max-w-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
                            <div className="flex gap-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                                {task.sub_tasks?.length > 0 && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                    >{task.sub_tasks.length} subtasks</span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                                <Pencil className="h-4 w-4"></Pencil>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDelete(task)}>
                                <Trash className="h-4 w-4"></Trash>
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <CardDescription className="text-sm mt-2">
                        {task.description || 'No Description'}
                    </CardDescription>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">
                            Due: {formatDate(task.due_date)}
                        </span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onAddSubtask(task.id)}>
                                <Plus className="h-4 w-4 mr-1"/>
                                    Add Subtask
                            </Button>
                           g
                        </div>
                    </div>

                </CardContent>

            </Card>
        </div>
    )

    
}

export default TaskCard