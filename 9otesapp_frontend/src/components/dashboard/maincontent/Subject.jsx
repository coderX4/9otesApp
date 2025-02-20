import { useEffect, useState } from "react";
import {ArrowRight, Plus} from "lucide-react";
import { useParams } from "react-router-dom";
import fetchInstance from "../../FetchInstance.js";
import Units from "./Units.jsx";

export default function Subject() {
    // Retrieve user from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
        console.error("User not found in sessionStorage.");
        return <div className="text-center text-red-500 mt-10">Error: User not found.</div>;
    }

    const { id } = JSON.parse(storedUser);
    const { subid } = useParams();

    // State Management
    const [showInput, setShowInput] = useState(false);
    const [newUnitName, setNewUnitName] = useState("");
    const [subject, setSubject] = useState([]);
    const [units, setUnits] = useState([]);

    const fetchSubject = async () => {
        try {
            const response = await fetchInstance(`http://localhost:8082/api/${id}/getsubject/${subid}`, {
                method: "GET",
            });
            setSubject(response);
        } catch (err) {
            console.error("Error fetching subject:", err);
        }
    };

    const fetchUnits = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/${subid}/getallunits`, {
                method: "GET",
            });
            setUnits(data);
        } catch (err) {
            console.error("Error fetching units:", err);
        }
    };


    // Fetch subject data
    useEffect(() => {
        fetchSubject();
        fetchUnits();
    }, [id, subid]); // Added dependencies

    const addUnit = async () => {
        if (!newUnitName.trim()) {
            setShowInput(false);
            fetchUnits();
            return;
        } else {
            try {
                await fetchInstance(`http://localhost:8082/api/${subid}/addunit`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ unitname: newUnitName }),
                });
                setNewUnitName("");
                setShowInput(false);
                fetchUnits();
            } catch (err) {
                console.error("Error adding Unit:", err);
            }
        }
    };

    return (
        <div className="flex-1 p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-l-2xl bg-gradient-to-br from-blue-100 to-indigo-300 p-6">
            {/* Main Container */}
            <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Subject Title */}
                <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        {subject?.subname || "Loading..."}
                    </h1>
                    <div className="flex items-center">
                        {!showInput && (
                            <button
                                onClick={() => setShowInput(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center transition-all w-full"
                            >
                                <Plus className="w-5 h-5 mr-2"/>
                                <span>Add Unit</span>
                            </button>
                        )}
                        {showInput && (
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="New Unit"
                                    value={newUnitName}
                                    onChange={(e) => setNewUnitName(e.target.value)}
                                    className="w-full p-3 text-gray-800 outline-none border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 pr-10"
                                    autoFocus
                                />
                                <button
                                    onClick={addUnit}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center"
                                >
                                    <ArrowRight className="w-5 h-5"/>
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Unit List */}
                <Units subid={subid} Units={units} setUnits={setUnits}/>

            </div>
        </div>
    );
}
