import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../AuthContext.jsx";

export default function DashboardLayout() {
    const { login } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const sidebarRef = useRef(null);

    useEffect(() => {
        login();
    }, [login]);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Close sidebar when clicking outside on small screens
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-300">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                {/* Sidebar (conditionally rendered on small screens) */}
                <div
                    ref={sidebarRef}
                    className={`fixed lg:relative top-0 left-0 h-full shadow-lg transition-transform duration-300 z-50 ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:block`}
                >
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}
