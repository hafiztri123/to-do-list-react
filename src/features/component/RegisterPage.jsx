import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import appleIcon from '../../assets/icons8-apple-logo.svg'
import googleIcon from '../../assets/icons8-google.svg'
import placeholder1 from '../../assets/placeholder-170.png';
import placeholder2 from '../../assets/placeholder-170.png';
import placeholder3 from '../../assets/placeholder-170.png';



const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    // Sample images - replace with your actual images
    const images = [
        {
            url: placeholder1,
            caption: 'Capturing Moments,'
        },
        {
            url: placeholder2,
            caption: 'Creating Memories'
        },
        {
            url: placeholder3,
            caption: 'Share Your Story'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => 
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 animate-gradient bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500"
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                    >
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-gray-950">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Create an account</h1>
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-400 hover:text-purple-300">
                                Log in
                            </a>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="relative"> 
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-gray-800 border-gray-700 text-white pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.agreeToTerms}
                                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-500"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                                I agree to the {' '}
                                <a href="/terms" className="text-purple-400 hover:text-purple-300">
                                    Terms & Condition
                                </a>
                            </label>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg"
                            disabled={!formData.agreeToTerms}
                        >
                            Create account
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-950 text-gray-400">
                                    Or register with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
                                >
                                    <img src={googleIcon} alt="Google" className="w-5 h-5" />
                                    Google
                            </Button>
                            <Button
                                type="button"
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                <img src={appleIcon} alt="Apple" className="w-5 h-5" />
                                Apple
                            </Button>

                        </div>
                    </form>

                </div>

            </div>

        </div>
    )
}

export default RegisterPage