import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Check, X } from "lucide-react"
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

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
            <form onSubmit={handleSubmit}>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <Input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                className="text-xl font-semibold mb-2"
                                placeholder="Task Title"
                                required
                                disabled={disabled}
                            />
                            <div className="flex gap-2">
                                <select
                                    className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                                    disabled={disabled}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <Input
                                    type="date"
                                    value={formData.due_date}
                                    onChange={(e) => setFormData(prev => ({...prev, due_date: e.target.value}))}
                                    className="text-sm"
                                    required
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                type="submit"
                                disabled={disabled || !formData.title.trim()}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                type="button"
                                onClick={onCancel}
                                disabled={disabled}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                        disabled={disabled}
                    />
                </CardContent>
            </form>
        </Card>
    )
}


export default EditTaskForm