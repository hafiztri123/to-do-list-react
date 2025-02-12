import React, { useState } from "react"
import SidebarCategories from "./SidebarCategories"
import sidebarCategories from "./SidebarCategories"
import Navbar from "./NavBar"
const MainLayout = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar/>
            <div className="flex flex-1">
            <div className="w-64 bg-white h-[calc(100vh-64px)] border-r border-gray-200 p-4">
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
        </div>
        
    )
}

export default MainLayout