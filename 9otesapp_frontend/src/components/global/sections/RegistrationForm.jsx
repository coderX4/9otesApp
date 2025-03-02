import { useState } from "react";
import { baseUrl } from "../globalindex.js";

export default function RegistrationForm() {
    const [uname, setUName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Trim inputs
        const trimmedUname = uname.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUname || !trimmedEmail || !trimmedPassword) {
            setErrorMessage("All fields are required!");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        if (trimmedPassword.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        const user = { uname: trimmedUname, email: trimmedEmail, password: trimmedPassword };
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/user/adduser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Registration failed. Please try again.");
            }

            setUName("");
            setEmail("");
            setPassword("");
            setSuccessMessage("Registration Successful!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 border border-green-300 rounded-lg shadow-md">
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-300 rounded-lg shadow-md">
                    {errorMessage}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        value={uname}
                        onChange={(e) => setUName(e.target.value)}
                        required
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded-lg font-semibold transition-colors ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </>
    );
}
