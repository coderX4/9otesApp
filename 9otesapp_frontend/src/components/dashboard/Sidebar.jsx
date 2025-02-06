import { Plus, Share2, Trash2 } from "lucide-react";
import {Link} from "react-router-dom";

export default function Sidebar() {
    const sidebarItems = [
        { id: 1, title: "DBMS" },
        { id: 2, title: "Compiler" },
    ];

    return (
        <aside className="w-64 bg-white bg-opacity-50 backdrop-blur-lg border-r border-indigo-200 shadow-lg rounded-r-2xl p-4">
            <button className="w-full flex items-center justify-center p-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all text-white shadow-lg">
                <Plus className="w-6 h-6" />
            </button>

            <div className="space-y-4 mt-4">
                {sidebarItems.map((item) => (
                    <Link to={`/dashboard/subject`}
                          key={item.id}
                          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                    >
                        <span className="text-gray-800 font-medium">{item.title}</span>
                        <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-800 transition-all p-1">
                                <Share2 className="w-5 h-5"/>
                            </button>
                            <button className="text-red-500 hover:text-red-700 transition-all p-1">
                                <Trash2 className="w-5 h-5"/>
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
