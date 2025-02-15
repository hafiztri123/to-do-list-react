import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronRight, Plus, Pencil, Trash, CheckSquare, Square, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useTasks } from "../tasks/hooks/useTasks"
import {Checkbox} from "../../components/ui/checkbox"
import EditTaskForm from "./EditTaskForm"
import AddSubtaskForm from "./AddSubtaskForm"
import {Alert, AlertDescription} from "../../components/ui/alert"

const TaskCard = ({ task, onEdit, onDelete, onAddSubtask, disabled}) => {

    const [showSubtasks, setShowSubtasks] = useState(true)
    const { useSubTaskQuery } = useTasks()
    const [isEditing, setIsEditing] = useState(false)
    const [showAddSubTaskForm, setShowAddSubTaskForm] = useState(false)
    const {data: subtasksData, isLoading: isSubtasksLoading} = useSubTaskQuery(showSubtasks ? task.id : null)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleStatusToggle = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        setIsAnimating(true)
        onEdit({
            ...task,
            status: newStatus
        });

        setTimeout(() => setIsAnimating(false), 300)
    };

    const getDueState = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate)
        const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return { state: 'overdue', color: 'bg-red-100 border-red-300'}
        } else if (diffDays <= 2 ) {
            return { state: 'urgent', color: 'bg-yellow-100 border-orange-300'}
        } else if (diffDays <= 7) {
            return { state: 'upcoming', color: 'bg-yellow-100 border-yellow-300'}
        }

        return {state: 'normal', color:''}
    }

    const handleSubtaskSubmit = (subtask) => {
        onAddSubtask(subtask)

        setShowAddSubTaskForm(false)
    }
    const handleEdit = (updateData) => {
        onEdit({...task, ...updateData})
        setIsEditing(false)
    }

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

    const dueState = getDueState(task.due_date)
    const isOverdue = dueState.state === 'overdue' && task.status !== 'completed'

    if (isEditing) {
        return (
            <EditTaskForm
                task={task}
                onEdit={handleEdit}
                onCancel={() => setIsEditing(false)}
                disabled={disabled}
                >
            </EditTaskForm>
        )
    }


    return (
        <div>
            <Card className={`w-full max-w-md transform transition-all duration-200 
                  hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
                  ${isOverdue ? 'border-red-300' : ''}`}>
            {(dueState.state === 'urgent' || dueState.state === 'overdue') && task.status !== 'completed' && (
                    <Alert className={`${dueState.color} border-0 rounded-none rounded-t-lg `}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            {dueState.state === 'overdue' 
                                ? 'This task is overdue!' 
                                : 'This task is due soon!'}
                        </AlertDescription>
                    </Alert>
                )}
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex-1 min-w-0">
                                <CardTitle className={`text-xl font-semibold break-words
                                    ${task.status === 'completed' ? 'line-through text-gray-500': ''}
                                    transition-all duration-300 ${isAnimating ? 'scale-95':''}
                                    `} >
                                    {task.title}
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                    {task.sub_tasks?.length > 0 && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            {task.sub_tasks.length} subtask(s)
                                        </span>
                                    )}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleStatusToggle}
                                        disabled={disabled}
                                        className="flex-shrink-0"
                                    >
                                        {task.status === 'completed' ? (
                                            <CheckSquare className="h-4 w-4" />
                                        ) : (
                                            <Square className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(!isEditing)}
                                disabled={disabled}
                            >
                                <Pencil className="h-4 w-4"/>
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => onDelete(task)} 
                                disabled={disabled}
                            >
                                <Trash className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <CardDescription className="text-sm mt-2 break-words">
                        {task.description || 'No Description'}
                    </CardDescription>
                    <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                        <span className="text-sm text-gray-500">
                            Due: {formatDate(task.due_date)}
                        </span>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setShowAddSubTaskForm(true)} 
                                disabled={disabled}>
                                <Plus className="h-4 w-4 mr-1"/>
                                    Add Subtask
                            </Button>
                            
                            {task.sub_tasks?.length > 0 && (
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setShowSubtasks(!showSubtasks)}
                                    disabled={disabled}
                                >
                                    <ChevronRight className={`h-4 w-4 mr-1 transform transition-transform ${showSubtasks ? 'rotate-90' : ''}`} />
                                    {showSubtasks ? 'Hide Subtasks' : 'View Subtasks'}
                                </Button>
                            )}
                           
                        </div>
                    </div>
                </CardContent>
            </Card>
            {showSubtasks && (
                <div className="ml-8 mt-4 space-y-4 animate-in slide-in-from-left-4 duration-200" >
                    {showAddSubTaskForm && (
                        <AddSubtaskForm
                            parentTask={task}
                            onSubmit={handleSubtaskSubmit}
                            onCancel={() => setShowAddSubTaskForm(false)}
                            disabled={disabled}
                        />
                    )}
                    {isSubtasksLoading ? (
                        <div>Loading subtasks...</div>
                    ) : (
                        subtasksData?.data?.map((subtask) => (
                            <TaskCard
                                key={subtask.id}
                                task={subtask}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onAddSubtask={onAddSubtask}
                                disabled={disabled}
                                
                            />
                        ))

                    )}

                </div>
                

            )}
                    

                </div>
            )}



export default TaskCard