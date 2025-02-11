import { useState } from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Plus, X } from "lucide-react"


const AddSubtaskForm = ({ parentTask, onSubmit, onCancel, disabled }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const newSubtask = {
            parent_id: parentTask.id,
            title: formData.title,
            description: formData.description,
            due_date: new Date(formData.due_date).toISOString(),
            status: 'pending',
            category_id: parentTask.category_id
        }



        onSubmit(newSubtask)

        

    }

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
            <form onSubmit={handleSubmit}>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Subtask Title"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                required
                                className="text-xl font-semibold"
                            />

                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={onCancel}
                            className="ml-2"
                        >
                            <X className="h-4 w-4"/>

                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Subtask Description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                        />
                        <div className="flex justify-between items-center">
                            <Input
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => setFormData(prev => ({...prev, due_date: e.target.value}))}
                                required
                                className="w-full"
                            />

                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={disabled}
                        >
                            Add Subtask
                        </Button>

                    </div>
                </CardContent>

            </form>

        </Card>
        
    )
}

export default AddSubtaskForm