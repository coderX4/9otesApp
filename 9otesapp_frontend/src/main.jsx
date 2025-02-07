import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HomeLayout, LoginForm, Home_Register, Aboutus, Contact } from './components/global/globalindex.js';
import { DashboardLayout ,MainSection,Subject} from './components/dashboard/dashboardindex.js';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {AuthProvider} from "./components/AuthContext.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomeLayout />}>
                <Route path="" element={<Home_Register />} />
                <Route path="aboutus" element={<Aboutus />} />
                <Route path="contactus" element={<Contact />} />
                <Route path="signin" element={<LoginForm />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<MainSection />} />
                <Route path="subject" element={<Subject />} />
            </Route>
        </>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
