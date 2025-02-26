import {ArrowRight, EllipsisVertical, Pencil, Plus, Trash2} from "lucide-react";
import Swal from "sweetalert2";
import fetchInstance from "../../FetchInstance.js";
import { useEffect, useState } from "react";
import Topics from "./Topics.jsx";

export default function Units({ subid, Units, setUnits }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [editingUnitId, setEditingUnitId] = useState(null);
    const [updateUnitName, setUpdateUnitName] = useState("");
    const [unitTopics, setUnitTopics] = useState({}); // Stores topics per unit
    const [topicForm, setTopicForm] = useState({
        unitId: null,
        topicName: "",
        topicDescription: "",
    });

    useEffect(() => {
        setUnits(Units);
    }, [Units]);

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

    const toggleActions = () => {
        setActiveUnit((prev) => (prev === null ? true : null)); // Toggle between `true` and `null`
    };


    const updateUnit = async (unitId) => {
        if (!updateUnitName.trim()) return;
        try {
            await fetchInstance(`http://localhost:8082/api/${subid}/updateunit/${unitId}?unitname=${updateUnitName}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });
            setEditingUnitId(null);
            fetchUnits();
        } catch (error) {
            console.error("Error updating unit:", error);
        }
    };

    const deleteUnit = async (unitId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetchInstance(`http://localhost:8082/api/${subid}/deleteunit/${unitId}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });
                    Swal.fire("Deleted!", "The unit has been removed.", "success");
                    fetchUnits();
                } catch (err) {
                    console.error("Error deleting unit:", err);
                    Swal.fire("Error!", "Failed to delete the unit.", "error");
                }
            }
        });
    };

    const fetchTopics = async (unitId) => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/${unitId}/getalltopics`, {
                method: "GET",
            });
            setUnitTopics((prev) => ({ ...prev, [unitId]: data }));
        } catch (err) {
            console.error("Error fetching topics:", err);
        }
    };

    const handleAddTopic = async () => {
        if (!topicForm.topicName.trim() || !topicForm.topicDescription.trim()) return;
        try {
            await fetchInstance(`http://localhost:8082/api/${topicForm.unitId}/addtopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topicName: topicForm.topicName,
                    topicDescription: topicForm.topicDescription,
                }),
            });

            setTopicForm({ unitId: null, topicName: "", topicDescription: "" });
            fetchTopics(topicForm.unitId);
        } catch (err) {
            console.error("Error adding topic:", err);
        }
    };

    return (
        <div className="p-6 space-y-4">
            {Units.length === 0 ? (
                <p className="text-center text-gray-500">No units available.</p>
            ) : (
                Units.map((unit) => (
                    <div key={unit.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-200">
                        {/* Unit Header */}
                        <div className="flex justify-between items-center">
                            {/* Unit Name / Edit Mode */}
                            <div className="flex-grow">
                                {editingUnitId === unit.id ? (
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="New unit name"
                                            value={updateUnitName}
                                            onChange={(e) => setUpdateUnitName(e.target.value)}
                                            className="w-2/3 p-2 text-gray-800 border rounded-lg outline-none"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => updateUnit(unit.id)}
                                            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <h2 className="text-xl font-semibold text-gray-800">{unit.unitname}</h2>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 min-h-[40px]">
                                <button
                                    onClick={() => setTopicForm({ unitId: unit.id, topicName: "", topicDescription: "" })}
                                    className="flex items-center space-x-1 bg-indigo-600 text-white hover:bg-indigo-700 transition-all px-3 py-2 rounded-md min-h-[40px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm">Add Topic</span>
                                </button>

                                {openDropdownId === unit.id ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingUnitId(unit.id);
                                                setUpdateUnitName(unit.unitname);
                                            }}
                                            className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition min-h-[40px] flex items-center justify-center"
                                        >
                                            <Pencil className="w-5 h-5"/>
                                        </button>
                                        <button
                                            onClick={() => deleteUnit(unit.id)}
                                            className="p-2 rounded-md text-red-600 hover:bg-red-100 transition min-h-[40px] flex items-center justify-center"
                                        >
                                            <Trash2 className="w-5 h-5"/>
                                        </button>
                                        <button
                                            onClick={() => setOpenDropdownId(null)}
                                            className="text-gray-600 hover:text-gray-900 transition-all p-1"
                                        >
                                            <EllipsisVertical className="w-5 h-5"/>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setOpenDropdownId(unit.id)}
                                        className="text-gray-600 hover:text-gray-900 transition-all p-2 rounded-md min-h-[40px] flex items-center justify-center"
                                    >
                                        <EllipsisVertical className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>

                        </div>

                        {/* Topic Form */}
                        {topicForm.unitId === unit.id && (
                            <div className="bg-gradient-to-r from-indigo-600/10 to-blue-500/10 rounded-xl p-6 mt-4 flex justify-center">
                                <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
                                    <input
                                        type="text"
                                        value={topicForm.topicName}
                                        onChange={(e) => setTopicForm((prev) => ({ ...prev, topicName: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-center shadow-sm"
                                        placeholder="New Topic Name"
                                    />
                                    <input
                                        type="text"
                                        value={topicForm.topicDescription}
                                        onChange={(e) => setTopicForm((prev) => ({ ...prev, topicDescription: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-center shadow-sm"
                                        placeholder="New Topic Description"
                                    />
                                    <button
                                        onClick={handleAddTopic}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* Topics List */}
                        <div className="mt-3">
                            <Topics unitid={unit.id} topics={unitTopics[unit.id] || []} setTopics={(topics) => setUnitTopics((prev) => ({ ...prev, [unit.id]: topics }))} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
