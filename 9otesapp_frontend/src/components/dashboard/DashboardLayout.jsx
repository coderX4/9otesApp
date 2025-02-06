import Header from "./Header";
import Sidebar from "./Sidebar";
import MainSection from "./MainSection";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-300">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
