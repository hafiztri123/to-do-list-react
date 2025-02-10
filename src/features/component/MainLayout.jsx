import React, { useState } from "react"
import SidebarCategories from "./SidebarCategories"
import sidebarCategories from "./SidebarCategories"
const MainLayout = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <SidebarCategories
                    onCategorySelect={setSelectedCategoryId}
                    selectedCategoryId={selectedCategoryId}
                />
            </div>
            <div className="flex-1 p-8 overflow-auto">
                {React.cloneElement(children, {selectedCategoryId})}
            </div>

        </div>
    )
}

export default MainLayout