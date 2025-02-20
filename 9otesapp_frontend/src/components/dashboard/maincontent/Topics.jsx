import {Trash2,FileText,Eye} from "lucide-react";
import fetchInstance from "../../FetchInstance.js";
import {useEffect, useState} from "react";

export default function Topics({unitid,topics,setTopics}) {
    setTopics(topics);
    const fetchTopics = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/${unitid}/getalltopics`, {
                method: "GET",
            });
            setTopics(data);
        } catch (err) {
            console.error("Error fetching topics:", err);
        }
    };

    useEffect(() => {
        fetchTopics();
    },[unitid])

    return (
        <>
            {/* Topics List */}
            <div className="space-y-4">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border border-gray-100"
                    >
                        <div className="grid grid-cols-[2fr,3fr,auto] gap-4 items-center">
                            <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                                {topic.topicName}
                            </div>
                            <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                                {topic.topicDescription}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                        title="View Topic">
                                    <Eye className="w-5 h-5"/>
                                </button>
                                <button className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                        title="View Details">
                                    <FileText className="w-5 h-5"/>
                                </button>
                                <button className="p-2 text-red-500 hover:text-red-700 transition-colors">
                                    <Trash2 className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}