"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Plus } from "lucide-react"
import { useParams } from "react-router-dom"
import fetchInstance from "../../FetchInstance.js"
import Units from "./Units.jsx"
import { baseUrl } from "../dashboardindex.js"

export default function Subject() {
    // Retrieve user from sessionStorage
    const storedUser = sessionStorage.getItem("user")
    if (!storedUser) {
        console.error("User not found in sessionStorage.")
        return <div className="text-center text-red-500 mt-10">Error: User not found.</div>
    }

    const { id } = JSON.parse(storedUser)
    const { subid } = useParams()

    // State Management
    const [showInput, setShowInput] = useState(false)
    const [newUnitName, setNewUnitName] = useState("")
    const [subject, setSubject] = useState([])
    const [units, setUnits] = useState([])

    const fetchSubject = async () => {
        try {
            const response = await fetchInstance(`${baseUrl}/api/${id}/getsubject/${subid}`, {
                method: "GET",
            })
            setSubject(response)
        } catch (err) {
            console.error("Error fetching subject:", err)
        }
    }

    const fetchUnits = async () => {
        try {
            const data = await fetchInstance(`${baseUrl}/api/${subid}/getallunits`, {
                method: "GET",
            })
            setUnits(data)
        } catch (err) {
            console.error("Error fetching units:", err)
        }
    }

    // Fetch subject data
    useEffect(() => {
        fetchSubject()
        fetchUnits()
    }, [subid]) // Added dependencies

    const addUnit = async () => {
        if (!newUnitName.trim()) {
            setShowInput(false)
            fetchUnits()
            return
        } else {
            try {
                await fetchInstance(`${baseUrl}/api/${subid}/addunit`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ unitname: newUnitName }),
                })
                setNewUnitName("")
                setShowInput(false)
                fetchUnits()
            } catch (err) {
                console.error("Error adding Unit:", err)
            }
        }
    }

    return (
        <div className="flex-1 p-4 md:p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-300">
            {/* Main Container */}
            <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Subject Title */}
                <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide text-center sm:text-left">
                        {subject?.subname || "Loading..."}
                    </h1>
                    <div className="flex items-center w-full sm:w-auto">
                        {!showInput && (
                            <button
                                onClick={() => setShowInput(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center transition-all w-full sm:w-auto"
                            >
                                <Plus className="w-5 h-5 mr-2" />
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
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Unit List */}
                <Units subid={subid} Units={units} setUnits={setUnits} />
            </div>
        </div>
    )
}

