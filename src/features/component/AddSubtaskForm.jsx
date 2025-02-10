import { useState } from "react"


const AddSubtaskForm = ({ parentTask, onAddSubtask, onCancel, disabled }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: new Date().toISOString().split('T')[0]
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const newSubtask = {
            parent_id: parentTask.id,
            category_id: parentTask.category_id, // Inherit parent's category
            title: formData.title,
            description: formData.description,
            due_date: new Date(formData.due_date).toISOString(),
            status: 'pending' 
        };

        onAddSubtask(newSubtask)
    }

    return (
        <div>Placeholder</div>
    )
}

export default AddSubtaskForm