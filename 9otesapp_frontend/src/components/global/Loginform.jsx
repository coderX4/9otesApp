import React from 'react';
import google from '../../assets/google.svg'
export default function LoginForm() {
    return (
        <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 opacity-10">
                <img
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Study background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">Welcome Back!</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.email@school.edu"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 text-sm">
                        Forgot your password?
                    </a>
                    <div className="my-4 flex items-center justify-center">
                        <div className="border-t border-gray-300 flex-grow mr-3" />
                        <span className="text-gray-500 font-medium">or</span>
                        <div className="border-t border-gray-300 flex-grow ml-3" />
                    </div>
                    <button className="w-full bg-white border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <img src={google} alt="Google logo" className="w-5 h-5" />
                        <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}


