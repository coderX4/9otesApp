import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, UserCircle, UserMinus } from "lucide-react";
import {useAuth} from "../AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const storedUser = sessionStorage.getItem("user");
    const { uname } = JSON.parse(storedUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const {logout} = useAuth();
    const navigate = useNavigate();
    const logoutUser = () => {
        logout();
        sessionStorage.removeItem("user");
        navigate("/signin");
    }

    return (
        <header className="bg-gradient-to-r from-indigo-700 to-blue-500 p-4 flex justify-between items-center shadow-lg rounded-b-2xl">
            <div className="text-2xl font-bold text-white tracking-wide">9otes</div>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <span className="font-medium">{uname}</span>
                    <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl py-2 border border-indigo-200 z-10">
                        <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors">
                            <UserCircle className="w-5 h-5 mr-2 text-indigo-600" />
                            Update profile
                        </button>
                        <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors">
                            <UserMinus className="w-5 h-5 mr-2 text-red-500" />
                            Delete Account
                        </button>
                        <button  onClick={logoutUser} className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors">
                            <LogOut className="w-5 h-5 mr-2 text-indigo-600" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
