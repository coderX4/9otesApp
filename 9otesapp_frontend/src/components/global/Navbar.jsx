import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <a href="/public" className="text-3xl font-extrabold text-indigo-800 hover:text-indigo-600 transition-colors">
                    9otes
                </a>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-8 items-center text-indigo-700">
                    <Link to="/home" className="hover:text-indigo-500 transition-colors font-medium">
                        Home
                    </Link>
                    <Link to="/aboutus" className="hover:text-indigo-500 transition-colors font-medium">
                        About
                    </Link>
                    <Link to="/contactus" className="hover:text-indigo-500 transition-colors font-medium">
                        Contact Us
                    </Link>
                    <Link
                        to="/signin"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all font-medium"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-indigo-800 focus:outline-none">
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}

