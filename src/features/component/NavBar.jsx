import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { LogOut } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth')
    }

    return (
        <div className="border-b bg-white">
            <div className="flex h-16 items-center px-4 justify-between">
                <h2 className="text-lg font-semibold">Task Manager</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <LogOut className="h-4 w-4 mr-2"/>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Navbar