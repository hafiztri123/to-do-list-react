import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Plus, X } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { useCategories } from "../categories/hooks/useCategories"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { getMinDate } from "../tasks/utils/dateUtils"

const CreateTaskForm = ({ onCreateTask, disabled }) => {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const {categories, isLoading: isCategoriesLoading, error: categoriesError} = useCategories() 
    const [formError, setFormError] = useState('')
    const minDate = getMinDate()


    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')
        
        const selectedDate = new Date(dueDate)
        selectedDate.setHours(0,0,0,0)
        const today = new Date()
        today.setHours(0,0,0,0)

        if (selectedDate < today) {
            setFormError('Due date cannot be in the past')
            return
        }
        

        const task = {
            title,
            description,
            due_date: new Date(dueDate).toISOString(),
            category_id: parseInt(categoryId)
        }

        onCreateTask(task)
        setTitle('')
        setDescription('')
        setDueDate('')
        setCategoryId('')
        setShowForm(false)
    }

    if(!showForm){
        return(
            <Button
                onClick={() => setShowForm(true)}
                className="mb-6"
                disabled={disabled}
            >
                <Plus className="h-4 w-4 mr-2"/>
                Create New Task
            </Button>
        )
    }

    if (categoriesError) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Error loading categories. Please try again later
                </AlertDescription>

            </Alert>
        )
    }


    return(
        <Card className="mb-6">
            <form onSubmit={handleSubmit}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Create New Task</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => setShowForm(false)}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required

                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required

                        />
                    </div>
                    <div className="space-y-2">
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 "
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            disabled={isCategoriesLoading}
                        >
                            <option value=""className="" >Select a Category</option>
                            {categories.map((category) => (
                                <option key = {category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="space-y-2">
                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                        {formError && (
                            <span className="text-sm text-red-500">
                                {formError}

                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={disabled || !title.trim() || !dueDate || !categoryId}
                    >
                        Create Task
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default CreateTaskForm