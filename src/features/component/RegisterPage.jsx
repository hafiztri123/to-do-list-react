import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import googleIcon from "../../assets/icons8-google.svg"
import appleIcon from "../../assets/icons8-apple-logo.svg"


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    const gradientStyle = {
        background: 'linear-gradient(-45deg, #6366f1, #a855f7, #ec4899, #6366f1)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
    };

    const keyframes = `
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <style>{keyframes}</style>
            <div className="min-h-screen flex">
                {/* Left side - Gradient Animation */}
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                    <div 
                        className="absolute inset-0"
                        style={gradientStyle}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-center px-12">
                        <div className="text-white space-y-6">
                            <h2 className="text-4xl font-bold">Welcome Back</h2>
                            <p className="text-lg text-white/90">Start your journey with us</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
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
                                    className="w-full bg-gray-800/50 border-gray-700 text-white"
                                    required
                                />
                            </div>
                            
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-gray-800/50 border-gray-700 text-white"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-gray-800/50 border-gray-700 text-white pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                                    I agree to the{' '}
                                    <a href="/terms" className="text-purple-400 hover:text-purple-300">
                                        Terms & Conditions
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
                                    <div className="w-full border-t border-gray-700" />
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
                                    className="flex items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-700 text-white"
                                >
                                    <img src={googleIcon} alt="Google Icon" className='w-6 h-6 object-contain' />
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    className="flex items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-700 text-white"
                                >
                                    <img src={appleIcon} alt="Apple Icon" className='w-6 h-6 object-contain' />

                                    Apple
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;