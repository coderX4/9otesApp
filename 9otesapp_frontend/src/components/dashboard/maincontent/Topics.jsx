import { Trash2, FileText, Eye } from "lucide-react";
import fetchInstance from "../../FetchInstance.js";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Topics({ unitid, topics, setTopics }) {

    const storedUser = sessionStorage.getItem("user");
    const { email, password } = JSON.parse(storedUser);
    const credentials = btoa(`${email}:${password}`);

    const [showInput, setShowInput] = useState(false);
    const [topicId, setTopicId] = useState("");
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

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
        if (unitid) {
            fetchTopics();
        }
    }, [unitid]); // Fetch topics only when unitid changes

    // Set folder name dynamically when topicId changes
    useEffect(() => {
        if (topicId) {
            setFolderName(`${email}folder`);
        }
    }, [topicId]);

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file to upload!");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("topicId",topicId);
        formData.append("folderName" ,folderName);

        try {
            const response = await fetch(`http://localhost:8082/api/drive/upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${credentials}`
                },
                body: formData,
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed!");
            }

            setFileUrl(data.link);
            setTimeout(() => setShowInput(false),3000)
            console.log("File uploaded successfully: ", data.link);
        } catch (error) {
            console.error("Upload error:", error);
            setError("File upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    

    return (
        <>
            {showInput && (
                <div style={{textAlign: "center", padding: "20px"}}>
                    <h1>Google Drive File Upload</h1>

                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                    <button onClick={uploadFile} disabled={uploading} style={{marginTop: "10px"}}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>

                    {error && <p style={{color: "red"}}>{error}</p>}

                    {fileUrl && (
                        <div>
                            <h3>Uploaded File:</h3>
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                View File
                            </a>
                        </div>
                    )}
                </div>
            )}

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
                                <Link to={fileUrl}>
                                    <button
                                        className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                        title="View Topic"
                                    >
                                        <Eye className="w-5 h-5"/>
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowInput(true);
                                        setTopicId(topic.id);
                                    }}
                                    className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                    title="View Details"
                                >
                                    <FileText className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-red-500 hover:text-red-700 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
