import { useState } from "react"
import { useCategories } from "../categories/hooks/useCategories"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Inbox, Plus, Trash2 } from "lucide-react"
import { useTasks } from "../tasks/hooks/useTasks"

const SidebarCategories = ({ onCategorySelect, selectedCategoryId }) => {
    const [newCategory, setNewCategory] = useState('')
    const {
        categories,
        isLoading,
        error,
        createCategory,
        deleteCategory,
        isCreating,
        isDeleting
    } = useCategories()
    const { tasks } = useTasks()
    const getTaskCountForCategory = (categoryId) => {
        return tasks?.filter(task => task.category_id === categoryId).length || 0
    }

    const getAllTasksCount = () => {
        return tasks?.length || 0
    }

    const handleCreateCategory = (e) => {
        e.preventDefault()
        if (!newCategory.trim()) return
        
        const category = {
            name: newCategory
        }

        createCategory(category, {
            onSuccess: () => {
                setNewCategory('')
            }
        })
    }

    const handleDeleteCategory = (categoryid) => {
        console.log(categoryid)
        if(window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(categoryid)
            if (selectedCategoryId === categoryid) {
                onCategorySelect(null)
            }
        }
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Error loading categories: {error.message}
                </AlertDescription>

            </Alert>
        )
    }

    




    return (
        <div className="space-y-4">
            <form onSubmit={handleCreateCategory} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    disable={isCreating}
                    className="flex-1"
                />
                <Button
                    type="submit"
                    disabled={isCreating || !newCategory.trim()}
                    size="icon"
                >
                    <Plus className="h-4 w-4"/>
                </Button>
            </form>

            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <Inbox className="h-4 w-4"/>
                    All Tasks
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full mr-left" >
                        {getAllTasksCount()}
                    </span>
                    
                </div>
                

                {isLoading  ? (
                    <div className="text-sm text-muted-foreground">Loading categories...</div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center justify-between group rounded-md px-2 py-1 hover:bg-accent cursor-pointer ${category.id === selectedCategoryId ? 'bg-accent': ''}`}
                            onClick={() => onCategorySelect(category.id)}
                        >
                            <span className="text-sm">{category.name}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    {getTaskCountForCategory(category.id)}
                                </span>
                            </div>
                            <Button variant="ghost" 
                                    size="icon" 
                                    className="opacity-0 group-hover:opacity-100 h-6 w-6" 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteCategory(category.id)
                                    }} 
                                    disabled={isDeleting} >
                                <Trash2 className="h-3 w-3"/>

                            </Button>

                        </div>
                    ))
                )}

            </div>
        </div>
    )

}

export default SidebarCategories