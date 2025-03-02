"use client"

import { Trash2, FileText, Pencil, Upload, EllipsisVertical } from "lucide-react"
import fetchInstance from "../../FetchInstance.js"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { baseUrl } from "../dashboardindex.js"

export default function Topics({ unitid, topics, setTopics }) {
    const [editingTopic, setEditingTopic] = useState(null)
    const [updatedTopicName, setUpdatedTopicName] = useState("")
    const [updatedDescription, setUpdatedDescription] = useState("")

    const [openDropdownId, setOpenDropdownId] = useState(null)

    const fetchTopics = async () => {
        try {
            const data = await fetchInstance(`${baseUrl}/api/${unitid}/getalltopics`, {
                method: "GET",
            })
            setTopics(data)
        } catch (err) {
            console.error("Error fetching topics:", err)
        }
    }

    useEffect(() => {
        if (unitid) {
            fetchTopics()
        }
    }, [unitid]) // Fetch topics only when unitid changes

    const handleEdit = (topic) => {
        setEditingTopic(topic.id)
        setUpdatedTopicName(topic.topicName)
        setUpdatedDescription(topic.topicDescription)
    }

    const handleUpdate = async () => {
        try {
            await fetchInstance(`${baseUrl}/api/${unitid}/updatetopic/${editingTopic}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topicName: updatedTopicName,
                    topicDescription: updatedDescription,
                }),
            })

            // Refresh topics
            fetchTopics()
            setEditingTopic(null)
        } catch (error) {
            console.error("Error updating topic:", error)
        }
    }

    const deleteTopic = async (topicId) => {
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
                    await fetchInstance(`${baseUrl}/api/${unitid}/deletetopic/${topicId}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    })
                    Swal.fire("Deleted!", "The Topic has been removed.", "success")
                    fetchTopics()
                } catch (err) {
                    console.error("Error deleting unit:", err)
                    Swal.fire("Error!", "Failed to delete the topic.", "error")
                }
            }
        })
    }

    const handlePreviewClick = async (topicId) => {
        try {
            const fileUrl = await fetchInstance(`${baseUrl}/api/${unitid}/showpreview/${topicId}`, {
                method: "GET",
            })

            console.log("API Response URL:", fileUrl)
            //window.location.href = fileUrl; // Navigate to the received URL same window
            window.open(fileUrl, "_blank") // Opens in a new tab
        } catch (err) {
            console.error(err.message || err)
        }
    }

    return (
        <div className="space-y-6 p-6 bg-white shadow-lg rounded-xl">
            {topics.length === 0 ? (
                <p className="text-gray-500 text-center">No topics available.</p>
            ) : (
                <div className="space-y-4">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-indigo-50 to-blue-50 gap-4"
                        >
                            <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
                                {/* Topic Name Box (Smaller - 30% on desktop, full width on mobile) */}
                                <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                                    {editingTopic === topic.id ? (
                                        <input
                                            type="text"
                                            value={updatedTopicName}
                                            onChange={(e) => setUpdatedTopicName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                        <h3 className="text-lg font-semibold text-gray-800">{topic.topicName}</h3>
                                    )}
                                </div>

                                {/* Topic Description Box (Larger - 70% on desktop, full width on mobile) */}
                                <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                                    {editingTopic === topic.id ? (
                                        <input
                                            type="text"
                                            value={updatedDescription}
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-600">{topic.topicDescription}</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 mt-3 md:mt-0 md:ml-4 w-full md:w-auto justify-end">
                                {openDropdownId === topic.id ? (
                                    <>
                                        <button
                                            onClick={() => handleEdit(topic)}
                                            className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                                            title="Edit"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>

                                        <button
                                            onClick={() => deleteTopic(topic.id)}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                        <button
                                            onClick={() => setOpenDropdownId(null)}
                                            className="text-gray-600 hover:text-gray-900 transition-all p-2 rounded-md min-h-[40px] flex items-center justify-center"
                                        >
                                            <EllipsisVertical className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {editingTopic === topic.id ? (
                                            <button
                                                onClick={handleUpdate}
                                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handlePreviewClick(topic.id)}
                                                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                                                title="Preview"
                                            >
                                                <FileText className="w-5 h-5" />
                                            </button>
                                        )}

                                        <Link to={`/dashboard/topic/${unitid}/${topic.id}`}>
                                            <button
                                                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                                                title="File Upload"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => setOpenDropdownId(topic.id)}
                                            className="text-gray-600 hover:text-gray-900 transition-all p-2 rounded-md min-h-[40px] flex items-center justify-center"
                                        >
                                            <EllipsisVertical className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

