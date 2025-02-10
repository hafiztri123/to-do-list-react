import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { X } from "lucide-react"
import { Input } from "../../components/ui/input"



const EditTaskForm = ({ task, onEdit, onCancel, disabled}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        due_date: '',
    })

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                due_date: new Date(task.due_date).toISOString().split('T')[0],
            })
        }
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault()
        onEdit({
            ...formData,
            due_date: new Date(formData.due_date).toISOString()
        })
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Edit Task</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={onCancel}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Task title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                            disabled={disabled} 
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Task description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                            disabled={disabled}
                        />
                    </div>
                    <div className="space-y-2">
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="date"
                            value={formData.due_date}
                            onChange={(e) => setFormData(prev => ({...prev, due_date: e.target.value}))}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={disabled || !formData.title.trim()}
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            >
                                Cancel
                            </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
        
    )
}

export default EditTaskForm