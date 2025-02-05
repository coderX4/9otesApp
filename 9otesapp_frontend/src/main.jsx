import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {HomeLayout,LoginForm,Home_Register,Aboutus,Contact} from './components/global/globalindex.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout />}>
            <Route path="/home" element={<Home_Register />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/signin" element={<LoginForm />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
