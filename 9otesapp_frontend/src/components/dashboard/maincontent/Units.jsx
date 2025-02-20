import {ArrowRight, Pencil, Plus, Trash2} from "lucide-react";
import Swal from "sweetalert2";
import fetchInstance from "../../FetchInstance.js";
import {useEffect, useState} from "react";
import Topics from "./Topics.jsx";
import {useNavigate} from "react-router-dom";

export default function Units({ subid,Units,setUnits}) {
    useEffect(() => {
        setUnits(Units)
    },[Units])
    const [updateUnitName, setUpdateUnitName] = useState("");
    const [editingUnitId, setEditingUnitId] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [unitId , setUnitId] = useState(0);
    const [topicName, setTopicName] = useState("");
    const [topicDescription, setTopicDescription] = useState("");

    const [topics ,setTopics] = useState([]);

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

    const updateUnit = async (unitid) => {
        if (!updateUnitName.trim()) return;
        try {
            await fetchInstance(`http://localhost:8082/api/${subid}/updateunit/${unitid}?unitname=${updateUnitName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"},
            })
                .then(() => setEditingUnitId(null))
                .then(() => setUpdateUnitName(""))
                .then(() => fetchUnits())

        } catch (error) {
            console.error("Error updating unit:", error);
        }
    };

    const deleteUnit = async (unitid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetchInstance(`http://localhost:8082/api/${subid}/deleteunit/${unitid}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });

                    Swal.fire("Deleted!", "The unit has been removed.", "success");
                    fetchUnits();  // Refresh the unit list after deletion
                } catch (err) {
                    console.error("Error deleting unit:", err);
                    Swal.fire("Error!", "Failed to delete the unit.", "error");
                }
            }
        });
    };

    const fetchTopics = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/${unitId}/getalltopics`, {
                method: "GET",
            });
            setTopics(data);
        } catch (err) {
            console.error("Error fetching topics:", err);
        }
    };

    const handleAddTopic = async () => {
        try {
            await fetchInstance(`http://localhost:8082/api/${unitId}/addtopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topicName, topicDescription }),
            });

            setTopicName("");
            setTopicDescription("");
            setShowForm(false);
            fetchTopics();

        } catch (err) {
            console.error("Error adding topic:", err);
        }
    };

    useEffect(() => {
        fetchTopics()
    }, [unitId]);


    return (
        <div className="p-6 space-y-4">
            {/* eslint-disable-next-line react/prop-types */}
            {Units.length === 0 ? (
                <p className="text-center text-gray-500">No units available.</p>
            ) : (
                // eslint-disable-next-line react/prop-types
                Units.map((unit) => (
                    <div
                        key={unit.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-200"
                    >
                        <div>
                            {/*Header container*/}
                            <div>
                                {/* Unit Header (Name + Buttons) */}
                                <div className="flex justify-between items-center space-x-4">
                                    {/* Unit Name / Input Field */}
                                    <div className="flex-grow">
                                        {editingUnitId === unit.id ? (
                                            <div className="flex items-center space-x-2 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="New unit name"
                                                    value={updateUnitName}
                                                    onChange={(e) => setUpdateUnitName(e.target.value)}
                                                    className="w-2/3 p-2 text-gray-800 outline-none border rounded-lg"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => updateUnit(unit.id)}
                                                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center"
                                                >
                                                    <ArrowRight className="w-5 h-5"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <h2 className="text-xl font-semibold text-gray-800">{unit.unitname}</h2>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 flex-shrink-0">
                                        <button
                                            onClick={() => {
                                                setShowForm(true)
                                                setUnitId(unit.id)
                                            }}
                                            className="flex items-center space-x-1 bg-indigo-600 text-white hover:bg-indigo-700 transition-all px-3 py-1.5 rounded-md">
                                            <Plus className="w-4 h-4"/>
                                            <span className="text-sm">Add Topic</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingUnitId(unit.id);
                                                setUpdateUnitName(unit.unitname);
                                            }}
                                            className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                                        >
                                            <Pencil className="w-5 h-5"/>
                                        </button>
                                        <button
                                            onClick={() => deleteUnit(unit.id)}
                                            className="p-2 rounded-md text-red-600 hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* New Topic Form */}
                            {showForm && (
                                <div className="bg-gradient-to-r from-indigo-600/10 to-blue-500/10 rounded-xl p-4 mb-6 mt-2">
                                    <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                            <input
                                                type="text"
                                                value={topicName}
                                                onChange={(e) => setTopicName(e.target.value)}
                                                className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                                placeholder="New Topic Name"
                                            />
                                            <input
                                                type="text"
                                                value={topicDescription}
                                                onChange={(e) => setTopicDescription(e.target.value)}
                                                className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                                placeholder="New Topic Description"
                                            />
                                            <button
                                                onClick={() => handleAddTopic(unit.id)}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/*topic list */}
                            <div className="mt-3">
                                <Topics unitid={unit.id} topics={topics} setTopics={setTopics}/>
                            </div>
                        </div>

                    </div>
                ))
            )}
        </div>
    );
}
