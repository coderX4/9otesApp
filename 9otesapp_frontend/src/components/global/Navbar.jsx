import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle mobile menu
    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Navbar Links Array (for cleaner mapping)
    const navLinks = [
        { name: "Home", path: "/home" },
        { name: "About", path: "/aboutus" },
        { name: "Contact Us", path: "/contactus" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 p-4 shadow-lg z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <a href="/public" className="text-3xl font-extrabold text-indigo-800 hover:text-indigo-600 transition-colors">
                    9otes
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center text-indigo-700">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="hover:text-indigo-500 transition-colors font-medium">
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/signin"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all font-medium"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-indigo-800 focus:outline-none">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div ref={menuRef} className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-4 text-indigo-700">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="hover:text-indigo-500 transition-colors font-medium">
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/signin"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all font-medium text-center"
                    >
                        Sign in
                    </Link>
                </div>
            )}
        </nav>
    );
}
