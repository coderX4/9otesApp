"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import fetchInstance from "../../FetchInstance.js"
import { baseUrl, eventBus } from "../dashboardindex.js"
import { useEffect, useState } from "react"

export default function MainSection() {
    const storedUser = sessionStorage.getItem("user")
    if (!storedUser) {
        console.error("User not found in sessionStorage.")
        return null
    }
    const { id } = JSON.parse(storedUser)

    const [subjects, setSubjects] = useState([])
    const [recentFiles, setRecentFiles] = useState([])

    const processSubjectsData = (data) => {
        const allRecentFiles = []

        const processedData = data.map((subject) => {
            const totalUnits = subject.units.length
            const totalTopics = subject.units.reduce((total, unit) => total + unit.topics.length, 0)
            const totalFiles = subject.units.reduce((fileCount, unit) => {
                unit.topics.forEach((topic) => {
                    allRecentFiles.push(...topic.fileUrls)
                })
                return fileCount + unit.topics.reduce((count, topic) => count + topic.fileUrls.length, 0)
            }, 0)

            return {
                name: subject.subname,
                units: totalUnits,
                topics: totalTopics,
                files: totalFiles,
            }
        })

        setRecentFiles(allRecentFiles.slice().reverse().slice(0, 5)) // Show last 5 uploaded files in reverse order
        return processedData
    }

    const fetchSubjects = async () => {
        try {
            const response = await fetchInstance(`${baseUrl}/api/${id}/getallsubjects`, { method: "GET" })
            const processedData = processSubjectsData(response)
            setSubjects(processedData)
        } catch (err) {
            console.error("Error fetching subjects:", err)
        }
    }

    useEffect(() => {
        fetchSubjects()

        const handleDelete = () => fetchSubjects()
        const handleAdd = () => fetchSubjects()
        const handleUpdate = () => fetchSubjects()

        eventBus.addEventListener("subjectDeleted", handleDelete)
        eventBus.addEventListener("subjectAdded", handleAdd)
        eventBus.addEventListener("subjectUpdated", handleUpdate)

        return () => {
            eventBus.removeEventListener("subjectDeleted", handleDelete)
            eventBus.removeEventListener("subjectAdded", handleAdd)
            eventBus.removeEventListener("subjectUpdated", handleUpdate)
        }
    }, [id, eventBus]) // Added id and eventBus as dependencies

    return (
        <main className="flex-1 p-4 md:p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-2xl ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4 md:mb-8">Welcome to NOTESFORGE</h1>
                <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">
                    Explore subjects, topics, and units to streamline your studies.
                </p>

                <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-md md:text-lg font-semibold text-indigo-800 mb-4">Subjects vs. Units, Topics & Files</h2>
                    <div className="w-full min-w-0 overflow-x-auto">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={subjects} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                                <XAxis dataKey="name" tick={{ fill: "#4F46E5" }} />
                                <YAxis tick={{ fill: "#4F46E5" }} allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="units" fill="#FF9800" radius={[5, 5, 0, 0]} />
                                <Bar dataKey="topics" fill="#4F46E5" radius={[5, 5, 0, 0]} />
                                <Bar dataKey="files" fill="#34D399" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-4 md:mt-8 bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 mb-4 md:mb-8">
                    <h2 className="text-md md:text-lg font-semibold text-indigo-800 mb-4">Recent File Uploads</h2>
                    <ul className="list-disc pl-4 md:pl-5 text-sm md:text-base text-gray-700">
                        {recentFiles.length > 0 ? (
                            recentFiles.map((file, index) => (
                                <li key={index} className="mb-2 break-words">
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        {file.fileName}
                                    </a>{" "}
                                    - {file.createdOn}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No recent uploads</p>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    )
}

