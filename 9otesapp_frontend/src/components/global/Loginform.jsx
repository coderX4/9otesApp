import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:8082/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensures session cookie is included
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                try {
                    const user = await response.json(); // Get user data
                    sessionStorage.setItem("user", JSON.stringify(user)); // Store user in sessionStorage
                } catch (jsonError) {
                    console.warn("User data not returned as JSON");
                }
                login();
                navigate("/dashboard"); // Redirect after login
            } else {
                const errorData = await response.json().catch(() => ({ message: "Login failed!" }));
                setError(errorData.message || "Login Failed, Please retry!");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const googleUser = {
                email: decoded.email,
                uname: decoded.name,
            };
            console.log(googleUser);

            // Optional: Send to backend for verification
            const response = await fetch('http://localhost:8082/api/user/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(googleUser),
            });

            if (response.ok) {
                try {
                    const user = await response.json(); // Get user data
                    sessionStorage.setItem("user", JSON.stringify(user)); // Store user in sessionStorage
                } catch (jsonError) {
                    console.warn("User data not returned as JSON");
                }
                login();
                navigate("/dashboard"); // Redirect after login
            } else {
                console.error("Google login failed on backend.");
                setError("Google login failed. Please try again.");
            }
        } catch (error) {
            console.error("Google login error:", error);
            setError("An error occurred during Google login.");
        }
    };

    return (
        <div className="mt-11 bg-white p-7 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 opacity-10">
                <img
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Study background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">Sign in</h1>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.email@school.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                        Login
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
                    <div className="w-full">
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                        >
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onFailure={() => setError("Google login failed.")}
                                text="signin_with"
                                theme="outline"
                                size="medium"
                                shape="pill"
                                width="100%"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
