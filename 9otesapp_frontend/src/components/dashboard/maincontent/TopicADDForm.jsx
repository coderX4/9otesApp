import { useState } from "react";
import { Plus } from "lucide-react";
import fetchInstance from "../../FetchInstance.js";
import {useNavigate, useParams} from "react-router-dom";

export default function TopicADDForm() {
    const {subid,unitid} = useParams();
    const [topicName, setTopicName] = useState("");
    const [topicDescription, setTopicDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchInstance(`http://localhost:8082/api/${unitid}/addtopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topicName,topicDescription})
            })
                .then(() => {
                    setTopicName("")
                    setTopicDescription("")
                })
                .then(() => navigate(`/dashboard/subject/${subid}`))

        } catch (err) {
            console.error("Error adding topic:", err);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 space-y-4">
            <div className="grid grid-cols-[2fr,3fr] gap-4 items-center">
                <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full"
                    placeholder="Topic Name"
                />
                <input
                    type="text"
                    value={topicDescription}
                    onChange={(e) => setTopicDescription(e.target.value)}
                    className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full"
                    placeholder="Description"
                />

                <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type="submit"
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                <Plus className="w-5 h-5" />
                <span>Add Topic</span>
            </button>
        </form>
    );
}
