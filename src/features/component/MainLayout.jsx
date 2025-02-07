
const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>

            </div>
            <div className="flex-1 p-8 overflow-auto">
                {children}
            </div>

        </div>
    )
}

export default MainLayout