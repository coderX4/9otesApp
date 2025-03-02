import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logo from "../../assets/logoimage.png";

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

    // Navbar Links Array
    const navLinks = [
        { name: "Home", path: "" },
        { name: "About", path: "/aboutus" },
        { name: "Contact Us", path: "/contactus" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-md z-50 rounded-b-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <img src={Logo} alt="NOTESFORGE Logo" className="h-16 w-auto object-contain"/>
                    <span className="text-xl md:text-2xl font-bold text-white tracking-wide">NOTESFORGE</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 lg:gap-8 items-center text-white">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="hover:text-blue-200 transition-colors font-medium text-sm md:text-base"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/signin"
                        className="bg-white/20 px-4 md:px-5 py-2 rounded-full hover:bg-white/30 transition-all font-medium text-sm md:text-base text-white"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div ref={menuRef}
                     className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-4 flex flex-col gap-4 text-indigo-700 rounded-b-2xl">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="hover:text-indigo-500 transition-colors font-medium text-sm sm:text-base">
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/signin"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all font-medium text-center text-sm sm:text-base"
                    >
                        Sign in
                    </Link>
                </div>
            )}
        </nav>
    );
}