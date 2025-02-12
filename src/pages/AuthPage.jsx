import React, { useState } from "react"
import { useAuth } from "../features/auth/hooks/useAuth"
import authWallpaper from "../assets/wallhaven-3k16pd.png"
import { Input } from "../components/ui/input"
import googleIcon from "../assets/Google__G__logo.svg.png"
import {Button} from "../components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { login, register, loginLoading, registerLoading, formError, setFormError } = useAuth()
    const handleSwitchForm = () => {
        setIsLogin(!isLogin)
        setFormData({name: '', email: '', password: ''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        if(isLogin) {
            login({
                email: formData.email,
                password: formData.password
            })
        } else {
            register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        }

    }

    return(
        <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100/50">
            <div className="hidden lg:block lg:w-1/2 p-4">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
                    <img src={authWallpaper} alt="" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-14">
                <div className="max-w-md w-full mx-auto space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-500">
                            {isLogin
                            ? 'Enter your email and password to access your account'
                            : 'Enter your details create your account'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {formError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                                {formError}
                            </div>
                        )}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password:e.target.value})}
                                required
                            />
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300"/>
                                    <label className="text-sm text-gray-500">Remember me</label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm text-gray-500 hover:text"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <div className="space-y-4 pt-2">
                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-black/90 rounded"
                                disabled={loginLoading||registerLoading}
                            >
                                {(loginLoading || registerLoading) ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                        {isLogin ? 'Sign In' : 'Sign Up'}
                                    </div>

                                ): (
                                    isLogin ? 'Sign In' : 'Sign Up'
                                )}
                            </Button>
                            
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                                Sign {isLogin ? 'in' : 'up'} with Google
                            </Button>
                        </div>
                        <p className="text-sm text-center text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? " }
                            <button
                                type="button"
                                className="text-black hover:underline font-medium"
                                onClick={() => {
                                    setIsLogin(!isLogin)
                                    setFormData({name: '', email: '', password: ''})
                                    setFormError('')
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AuthPage