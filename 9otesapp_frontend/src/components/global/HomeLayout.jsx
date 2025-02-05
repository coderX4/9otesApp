import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-200">
            <Navbar/>
            <div className="flex flex-grow items-center justify-center px-6 py-12">
                < Outlet/>
            </div>
            <Footer/>
        </div>
    )
}