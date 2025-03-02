"use client"

import { CloudDownload, ArrowRight, Eye, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { baseUrl, eventBus } from "../dashboardindex.js"

export default function ImportedSubject() {
    const storedUser = sessionStorage.getItem("user")
    if (!storedUser) {
        console.error("User not found in sessionStorage.")
        return null
    }
    const { id, email, password } = JSON.parse(storedUser)
    const credentials = btoa(`${email}:${password}`)

    const [link, setLink] = useState("")
    const [subid, setSubId] = useState("")
    const [subject, setSubject] = useState(null)
    const [showSubject, setShowSubject] = useState(false)
    const [visibleFileTable, setVisibleFileTable] = useState(null) // Track visible file table

    useEffect(() => {
        //This effect will run only once after the initial render
    }, [])

    const Fetch = () => {
        const newId = link.substring(link.lastIndexOf("/") + 1)
        setSubId(newId)
        fetchSubject(newId)
    }

    const fetchSubject = async (subjectId) => {
        try {
            const response = await fetch(`${baseUrl}/api/sharedSubject/getSubject/${subjectId}`)
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            const data = await response.json()
            setSubject(data)
            setShowSubject(true)
        } catch (err) {
            console.error("Error fetching subject:", err)
        }
    }

    const handlePreviewFile = (topicId) => {
        const topic = subject.units.flatMap((unit) => unit.topics).find((t) => t.id === topicId)
        if (!topic || !topic.previewStateId) return
        const file = topic.fileUrls.find((fileUrl) => fileUrl.id === topic.previewStateId)
        if (file) window.open(file.url, "_blank")
    }

    const toggleFileTable = (topicId) => {
        setVisibleFileTable(visibleFileTable === topicId ? null : topicId) // Toggle table visibility
    }

    const ImportSubject = async () => {
        const result = await Swal.fire({
            title: "Do you want to import this subject?",
            showCancelButton: true,
            confirmButtonText: "Yes, import",
            cancelButtonText: "Cancel",
            icon: "question",
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${baseUrl}/api/${id}/addImportedSubject`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${credentials}`,
                    },
                    body: JSON.stringify(subject), // Stringify the subject object
                    credentials: "include",
                })

                if (!response.ok) {
                    throw new Error("Failed to import subject")
                }

                await Swal.fire("Imported!", "The subject has been imported.", "success")
                eventBus.dispatchEvent(new Event("subjectImported"))
            } catch (err) {
                console.error("Error adding subject:", err)
                await Swal.fire("Error!", "Import failed.", "error")
            }
        }
    }

    return (
        <div className="flex-1 p-4 md:p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-2xl">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 md:mb-8">Import Subject</h1>
                <div className="bg-white shadow-md p-4 md:p-6 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Link for imported subject here"
                        className="w-full md:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={Fetch}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 flex items-center space-x-2 w-full md:w-auto justify-center"
                    >
                        <span>Fetch</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
                {/*Subject Preview */}
                {showSubject && (
                    <div className="mt-8">
                        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-4 md:p-6 text-white text-xl md:text-2xl font-bold tracking-wide flex flex-col md:flex-row justify-between items-center gap-4">
                                <span className="text-center md:text-left">{subject.subname || "Loading..."}</span>
                                <button
                                    onClick={ImportSubject}
                                    className="bg-white text-indigo-700 font-semibold px-2 py-2 rounded-lg shadow hover:bg-gray-200 transition flex items-center space-x-2 w-full md:w-auto justify-center"
                                >
                                    <CloudDownload />
                                    <span>Import</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-6 space-y-6">
                                {subject.units.length > 0 ? (
                                    subject.units.map((unit) => (
                                        <div key={unit.id} className="bg-gray-100 p-4 md:p-5 rounded-lg shadow-md">
                                            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">{unit.unitname}</h2>
                                            {unit.topics.length > 0 ? (
                                                unit.topics.map((topic) => (
                                                    <div key={topic.id} className="bg-white p-3 md:p-4 rounded-lg shadow-md mb-4">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div className="w-full md:w-1/3 bg-gray-50 p-3 md:p-4 rounded-lg shadow">
                                                                <h3 className="text-base md:text-lg font-semibold text-gray-800">{topic.topicName}</h3>
                                                            </div>
                                                            <div className="w-full md:w-2/3 bg-gray-50 p-3 md:p-4 rounded-lg shadow">
                                                                <p className="text-sm md:text-base text-gray-600">{topic.topicDescription}</p>
                                                            </div>
                                                            <div className="mt-4 flex gap-4 justify-center md:justify-start">
                                                                <button
                                                                    onClick={() => handlePreviewFile(topic.id)}
                                                                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                                                >
                                                                    <Eye className="w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => toggleFileTable(topic.id)}
                                                                    className={`p-2 ${visibleFileTable === topic.id ? "bg-red-500" : "bg-indigo-600"} text-white rounded-lg hover:opacity-80`}
                                                                >
                                                                    <FileText className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* File Table (Visible only when toggled) */}
                                                        {visibleFileTable === topic.id && topic.fileUrls.length > 0 && (
                                                            <div className="overflow-x-auto mt-4">
                                                                <table className="w-full text-xs md:text-sm text-gray-700 border border-gray-300 rounded-lg overflow-hidden">
                                                                    <thead className="text-xs uppercase bg-gray-200">
                                                                    <tr>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">S No.</th>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">File Name</th>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">Date</th>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">Time</th>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">Comment</th>
                                                                        <th className="px-2 md:px-6 py-2 md:py-3">Preview</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {topic.fileUrls
                                                                        .slice()
                                                                        .reverse()
                                                                        .map((fileUrl, index) => (
                                                                            <tr key={fileUrl.id} className="border-b even:bg-gray-100">
                                                                                <td className="px-2 md:px-6 py-2 md:py-4">{index + 1}</td>
                                                                                <td className="px-2 md:px-6 py-2 md:py-4 truncate max-w-[80px] md:max-w-none">
                                                                                    {fileUrl.fileName}
                                                                                </td>
                                                                                <td className="px-2 md:px-6 py-2 md:py-4">{fileUrl.createdOn}</td>
                                                                                <td className="px-2 md:px-6 py-2 md:py-4">{fileUrl.createdAt}</td>
                                                                                <td className="px-2 md:px-6 py-2 md:py-4 truncate max-w-[80px] md:max-w-none">
                                                                                    {fileUrl.comment}
                                                                                </td>
                                                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                                                    <Link
                                                                                        to={fileUrl.url}
                                                                                        target="_blank"
                                                                                        className="text-blue-600 hover:underline"
                                                                                    >
                                                                                        Open
                                                                                    </Link>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-center">No topics available.</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">No units available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

