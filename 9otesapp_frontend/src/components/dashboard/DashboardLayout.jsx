import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet,useNavigate } from 'react-router-dom'
import {useEffect} from "react";
import {useAuth} from "../AuthContext.jsx";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const {login} = useAuth();

    useEffect(() => {
        login();
        navigate("/dashboard");
    }, [login]);
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
