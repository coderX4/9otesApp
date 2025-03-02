import DashboardLayout from './DashboardLayout.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import MainSection from './maincontent/MainSection.jsx';
import Subject from './maincontent/Subject.jsx';
import FilesUpload from "./maincontent/FilesUpload.jsx";
import ImportedSubject from "./maincontent/ImportedSubject.jsx";

const baseUrl = import.meta.env.VITE_API_URL;
const eventBus = new EventTarget();

export {DashboardLayout,Header,Footer,Sidebar,
        MainSection,Subject,FilesUpload,ImportedSubject,baseUrl,eventBus};