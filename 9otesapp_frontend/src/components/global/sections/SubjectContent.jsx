import { FileText, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SubjectContent() {
    const { subId } = useParams();
    const [subject, setSubject] = useState(null);
    const [visibleFileTable, setVisibleFileTable] = useState(null); // Track visible file table

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/sharedSubject/getSubject/${subId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setSubject(data);
            } catch (err) {
                console.error("Error fetching subject:", err);
            }
        };
        fetchSubject();
    }, [subId]);

    if (!subject) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    const handlePreviewFile = (topicId) => {
        const topic = subject.units.flatMap(unit => unit.topics).find(t => t.id === topicId);
        if (!topic || !topic.previewStateId) return;
        const file = topic.fileUrls.find(fileUrl => fileUrl.id === topic.previewStateId);
        if (file) window.open(file.url, "_blank");
    };

    const toggleFileTable = (topicId) => {
        setVisibleFileTable(visibleFileTable === topicId ? null : topicId); // Toggle table visibility
    };

    return (
        <div className="mt-3 w-full bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-6 text-white text-3xl font-bold tracking-wide">
                    {subject.subname || "Loading..."}
                </div>
                <div className="p-6 space-y-6">
                    {subject.units.length > 0 ? (
                        subject.units.map((unit) => (
                            <div key={unit.id} className="bg-gray-100 p-5 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">{unit.unitname}</h2>
                                {unit.topics.length > 0 ? (
                                    unit.topics.map((topic) => (
                                        <div key={topic.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow">
                                                    <h3 className="text-lg font-semibold text-gray-800">{topic.topicName}</h3>
                                                </div>
                                                <div className="w-full md:w-2/3 bg-gray-50 p-4 rounded-lg shadow">
                                                    <p className="text-gray-600">{topic.topicDescription}</p>
                                                </div>
                                                <div className="mt-4 flex gap-4">
                                                    <button
                                                        onClick={() => handlePreviewFile(topic.id)}
                                                        className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                                    >
                                                        <Eye className="w-5 h-5"/>
                                                    </button>
                                                    <button
                                                        onClick={() => toggleFileTable(topic.id)}
                                                        className={`p-2 ${visibleFileTable === topic.id ? "bg-red-500" : "bg-indigo-600"} text-white rounded-lg hover:opacity-80`}
                                                    >
                                                        <FileText className="w-5 h-5"/>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* File Table (Visible only when toggled) */}
                                            {visibleFileTable === topic.id && topic.fileUrls.length > 0 && (
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg overflow-hidden">
                                                        <thead className="text-xs uppercase bg-gray-200">
                                                        <tr>
                                                            <th className="px-6 py-3">S No.</th>
                                                            <th className="px-6 py-3">File Name</th>
                                                            <th className="px-6 py-3">Date</th>
                                                            <th className="px-6 py-3">Time</th>
                                                            <th className="px-6 py-3">Comment</th>
                                                            <th className="px-6 py-3">Preview</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {topic.fileUrls.slice().reverse().map((fileUrl, index) => (
                                                            <tr key={fileUrl.id} className="border-b even:bg-gray-100">
                                                                <td className="px-6 py-4">{index + 1}</td>
                                                                <td className="px-6 py-4">{fileUrl.fileName}</td>
                                                                <td className="px-6 py-4">{fileUrl.createdOn}</td>
                                                                <td className="px-6 py-4">{fileUrl.createdAt}</td>
                                                                <td className="px-6 py-4">{fileUrl.comment}</td>
                                                                <td className="px-6 py-4">
                                                                    <Link to={fileUrl.url} target="_blank" className="text-blue-600 hover:underline">
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
    );
}
