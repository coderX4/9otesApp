import { Plus, Share2, Trash2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchInstance from "../FetchInstance.js"

export default function Sidebar() {
    const [showInput, setShowInput] = useState(false)
    const [newSubjectName, setNewSubjectName] = useState("")
    const [subjects, setSubjects] = useState([])

    const storedUser = sessionStorage.getItem("user")
    if (!storedUser) {
        console.error("User not found in sessionStorage.")
        return null
    }

    const { id } = JSON.parse(storedUser)

    const fetchSubjects = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/${id}/getallsubjects`, {
                method: "GET",
            })
            setSubjects(data)
        } catch (err) {
            console.error("Error fetching subjects:", err)
        }
    }

    const addSubject = async () => {
        if (!newSubjectName.trim()) return

        try {
            await fetchInstance(`http://localhost:8082/api/${id}/addsubject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subname: newSubjectName }),
            })
            setNewSubjectName("")
            setShowInput(false)
            fetchSubjects();
        } catch (err) {
            console.error("Error adding subject:", err)
        }
    }

    // Delete employee by ID
    const deleteSubject = async (subid) => {
        try {
            await fetchInstance(`http://localhost:8082/api/${id}/deletesub/${subid}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })

        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);


    return (
        <aside className="w-64 bg-white bg-opacity-50 backdrop-blur-lg border-r border-indigo-200 shadow-lg rounded-r-2xl p-4 flex flex-col h-full">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-indigo-800 mb-2">Subjects</h2>
                <div className="flex items-center">
                    {!showInput && (
                        <button
                            onClick={() => setShowInput(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 rounded-lg flex items-center justify-center transition-all w-full"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            <span>Add Subject</span>
                        </button>
                    )}
                    {showInput && (
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="New subject name"
                                value={newSubjectName}
                                onChange={(e) => setNewSubjectName(e.target.value)}
                                className="w-full p-3 text-gray-800 outline-none border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 pr-10"
                                autoFocus
                            />
                            <button
                                onClick={addSubject}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center"
                            >
                                <ArrowRight className="w-5 h-5"/>
                            </button>
                        </div>

                    )}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                {subjects.length > 0 ? (
                    <ul className="space-y-3">
                        {subjects.map((subject) => (
                            <li key={subject.id}>
                                <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                    <Link
                                        to={`/dashboard/subject/${subject.id}`}>
                                        <span
                                            className="text-gray-800 font-medium truncate mr-2">{subject.subname}</span>
                                    </Link>
                                    <div className="flex space-x-1 flex-shrink-0">
                                        <button className="text-indigo-600 hover:text-indigo-800 transition-all p-1">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => {deleteSubject(subject.id).then(() => fetchSubjects())}} className="text-red-500 hover:text-red-700 transition-all p-1">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
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

