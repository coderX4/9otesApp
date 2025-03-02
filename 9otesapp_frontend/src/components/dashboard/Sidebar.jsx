"use client"

import { Import, EllipsisVertical, Share2, LayoutDashboard, Plus, Trash2, ArrowRight, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchInstance from "../FetchInstance.js"
import Swal from "sweetalert2"
import { baseUrl, eventBus } from "./dashboardindex.js"

export default function Sidebar() {
    const [showInput, setShowInput] = useState(false)
    const [newSubjectName, setNewSubjectName] = useState("")
    const [subjects, setSubjects] = useState([])
    const [updateName, setUpdateName] = useState("")
    const [editingSubjectId, setEditingSubjectId] = useState(null)

    const [openDropdownId, setOpenDropdownId] = useState(null)

    const storedUser = sessionStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user) {
        console.error("User not found in sessionStorage.")
        return null
    }
    const { id } = user

    useEffect(() => {
        fetchSubjects()

        const handleImport = () => fetchSubjects()

        eventBus.addEventListener("subjectImported", handleImport)

        return () => eventBus.removeEventListener("subjectImported", handleImport)
    }, [])

    const fetchSubjects = async () => {
        try {
            const data = await fetchInstance(`${baseUrl}/api/${id}/getallsubjects`, { method: "GET" })
            setSubjects(data)
        } catch (err) {
            console.error("Error fetching subjects:", err)
        }
    }

    const addSubject = async () => {
        if (!newSubjectName.trim()) {
            setShowInput(false)
            return
        }
        try {
            await fetchInstance(`${baseUrl}/api/${id}/addsubject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subname: newSubjectName }),
            })
            setNewSubjectName("")
            setShowInput(false)
            fetchSubjects()
            eventBus.dispatchEvent(new Event("subjectAdded"))
        } catch (err) {
            console.error("Error adding subject:", err)
        }
    }

    const updateSubject = async (subid) => {
        if (!updateName.trim()) return
        try {
            await fetchInstance(`${baseUrl}/api/${id}/updatesub/${subid}?subname=${updateName}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
            setEditingSubjectId(null)
            setUpdateName("")
            fetchSubjects()
            eventBus.dispatchEvent(new Event("subjectUpdated"))
        } catch (error) {
            console.error("Error updating subject:", error)
        }
    }

    const deleteSubject = async (subid) => {
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
                    await fetchInstance(`${baseUrl}/api/${id}/deletesub/${subid}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    })
                    Swal.fire("Deleted!", "The subject has been removed.", "success")
                    fetchSubjects()
                    eventBus.dispatchEvent(new Event("subjectDeleted"))
                } catch (err) {
                    console.error("Error deleting subject:", err)
                    Swal.fire("Error!", "Failed to delete the subject.", "error")
                }
            }
        })
    }

    const shareSubject = (subjectId) => {
        const shareUrl = `${window.location.origin}/sharedSubject/${subjectId}`

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                Swal.fire({
                    title: "Share Subject",
                    html: `
                <p class="text-gray-700">The link has been copied to your clipboard.</p>
                <div class="bg-gray-100 p-2 rounded-lg mt-3">
                    <a href="${shareUrl}" target="_blank" class="text-indigo-600 font-medium break-all">${shareUrl}</a>
                </div>
                <button id="copyLinkBtn" class="swal2-confirm swal2-styled mt-3" style="background-color: #6366F1; color: white; padding: 8px 16px; border-radius: 5px;">
                    Copy Again
                </button>
            `,
                    icon: "success",
                    showConfirmButton: false,
                    showCloseButton: true,
                    didOpen: () => {
                        document.getElementById("copyLinkBtn").addEventListener("click", () => {
                            navigator.clipboard.writeText(shareUrl)
                            Swal.fire("Copied!", "The link has been copied again.", "success")
                        })
                    },
                })
            })
            .catch(() => {
                Swal.fire("Error!", "Failed to copy the link.", "error")
            })
    }

    return (
        <aside className="w-64 bg-white bg-opacity-50 backdrop-blur-lg border-r border-indigo-200 shadow-lg rounded-r-2xl p-3 md:p-4 flex flex-col h-full">
            <div className="mb-4 md:mb-6">
                <Link to={`/dashboard/mainsection`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center w-full">
                        <LayoutDashboard className="w-5 h-5 mr-2" />
                        <span>Dashboard</span>
                    </button>
                </Link>

                <Link to={`/dashboard/importSubject`}>
                    <button className="mt-3 md:mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center w-full">
                        <Import className="w-5 h-5 mr-2" />
                        <span>Import</span>
                    </button>
                </Link>

                <h2 className="text-lg md:text-xl font-semibold text-indigo-800 mt-3 md:mt-4 mb-2">Subjects</h2>

                {showInput ? (
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="New subject name"
                            value={newSubjectName}
                            onChange={(e) => setNewSubjectName(e.target.value)}
                            className="w-full p-2 md:p-3 text-gray-800 outline-none border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 pr-10"
                            autoFocus
                        />
                        <button
                            onClick={addSubject}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowInput(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center w-full"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        <span>Add Subject</span>
                    </button>
                )}
            </div>

            <div className="flex-grow overflow-y-auto">
                {subjects.length > 0 ? (
                    <ul className="space-y-2 md:space-y-3">
                        {subjects.map((subject) => (
                            <li key={subject.id} className="relative">
                                {editingSubjectId === subject.id ? (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Update subject name"
                                            value={updateName}
                                            onChange={(e) => setUpdateName(e.target.value)}
                                            className="w-full p-2 md:p-3 text-gray-800 outline-none border rounded-lg shadow-sm"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => updateSubject(subject.id)}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                        <Link to={`/dashboard/subject/${subject.id}`} className="flex-grow text-center">
                                            <span className="text-gray-800 font-medium truncate">{subject.subname}</span>
                                        </Link>

                                        <div className="flex items-center space-x-1 md:space-x-2">
                                            {openDropdownId === subject.id ? (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingSubjectId(subject.id)
                                                            setUpdateName(subject.subname)
                                                            setOpenDropdownId(null)
                                                        }}
                                                        className="text-gray-700 hover:text-indigo-600 transition-all p-1"
                                                    >
                                                        <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteSubject(subject.id)
                                                            setOpenDropdownId(null)
                                                        }}
                                                        className="text-red-600 hover:text-red-800 transition-all p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setOpenDropdownId(null)}
                                                        className="text-gray-600 hover:text-gray-900 transition-all p-1"
                                                    >
                                                        <EllipsisVertical className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => shareSubject(subject.id)}
                                                        className="text-blue-600 hover:text-blue-800 transition-all p-1"
                                                    >
                                                        <Share2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setOpenDropdownId(subject.id)}
                                                        className="text-gray-600 hover:text-gray-900 transition-all p-1"
                                                    >
                                                        <EllipsisVertical className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm text-center w-full">No subjects available.</p>
                )}
            </div>
        </aside>
    )
}

