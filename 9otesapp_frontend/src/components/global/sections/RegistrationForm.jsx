import {useState, useEffect} from 'react'
export default function RegistrationForm() {
    const [uname, setUName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { uname, email, password };

        fetch("http://localhost:8082/api/user/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then(() => {
                setUName("");
                setEmail("");
                setPassword("");
                setSuccessMessage("Registration Successfull!");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((err) => console.error("Error adding user:", err));
    };
    return (
        <>
            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 border border-green-300 rounded-lg shadow-md">
                    {successMessage}
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
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                    Register
                </button>
            </form>
        </>
    )
}