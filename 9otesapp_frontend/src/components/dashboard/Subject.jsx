import { useState } from "react";
import { Plus, Eye, FileText, Pencil, Trash2 } from "lucide-react";

export default function Subject() {
    const [topics, setTopics] = useState([
        {
            id: 1,
            name: "Introduction to DBMS",
            description: "Basic concepts and overview of Database Management Systems",
        },
        {
            id: 2,
            name: "SQL Fundamentals",
            description: "Introduction to Structured Query Language and basic commands",
        },
    ]);

    const [newTopic, setNewTopic] = useState({ name: "", description: "" });

    const handleAddTopic = () => {
        if (newTopic.name && newTopic.description) {
            const newTopicData = { id: Date.now(), ...newTopic };
            setTopics([...topics, newTopicData]);
            setNewTopic({ name: "", description: "" }); // Reset fields
        }
    };

    const handleDeleteTopic = (id) => {
        setTopics(topics.filter((topic) => topic.id !== id));
    };

    const handleUpdateTopic = (id, updatedTopic) => {
        setTopics(
            topics.map((topic) =>
                topic.id === id ? { ...topic, ...updatedTopic } : topic
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* DBMS Title Section */}
                <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">DBMS</h1>
                    <button
                        onClick={handleAddTopic}
                        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-lg text-white font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Topic</span>
                    </button>
                </div>

                {/* Unit Content */}
                <div className="p-6">
                    {/* New Topic Form */}
                    <div className="bg-gradient-to-r from-indigo-600/10 to-blue-500/10 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={newTopic.name}
                                    onChange={(e) =>
                                        setNewTopic({ ...newTopic, name: e.target.value })
                                    }
                                    className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    placeholder="New Topic Name"
                                />
                                <input
                                    type="text"
                                    value={newTopic.description}
                                    onChange={(e) =>
                                        setNewTopic({ ...newTopic, description: e.target.value })
                                    }
                                    className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    placeholder="New Topic Description"
                                />
                                <button
                                    onClick={handleAddTopic}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Topics List */}
                    <div className="space-y-4">
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-100"
                            >
                                <div className="grid grid-cols-[2fr,3fr,auto] gap-4 items-center">
                                    <input
                                        type="text"
                                        value={topic.name}
                                        onChange={(e) =>
                                            handleUpdateTopic(topic.id, {
                                                name: e.target.value,
                                            })
                                        }
                                        className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="Topic name"
                                    />
                                    <input
                                        type="text"
                                        value={topic.description}
                                        onChange={(e) =>
                                            handleUpdateTopic(topic.id, {
                                                description: e.target.value,
                                            })
                                        }
                                        className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="Description"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors" title="View Topic">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors" title="View Details">
                                            <FileText className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors" title="Edit Topic">
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTopic(topic.id)}
                                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                            title="Delete Topic"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
