import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchInstance from "../../FetchInstance.js";
import FileUrlsComp from "./FileUrlsComp.jsx";
import {UploadCloud} from "lucide-react";

export default function FilesUpload() {
    const { unitid, topicid } = useParams();
    const storedUser = sessionStorage.getItem("user");
    const { email, password } = JSON.parse(storedUser);
    const credentials = btoa(`${email}:${password}`);

    const [topicData, setTopicData] = useState({});
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState("");
    const [comment, setComment] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const data = await fetchInstance(
                    `http://localhost:8082/api/${unitid}/gettopicdata/${topicid}`,
                    { method: "GET" }
                );
                setTopicData(data);
            } catch (err) {
                console.error("Error fetching topic data:", err);
            }
        };
        fetchTopicData();
    }, []);

    useEffect(() => {
        if (topicData) {
            setFolderName(`${email}folder`);
        }
    }, [topicData]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file to upload!");
            return;
        }
        if (!comment.trim()) {
            alert("Please enter a description for the file!");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("topicId", topicid);
        formData.append("folderName", folderName);
        formData.append("comment", comment);

        try {
            const response = await fetch(`http://localhost:8082/api/drive/upload`, {
                method: "POST",
                headers: { Authorization: `Basic ${credentials}` },
                body: formData,
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Upload failed!");

            setComment("")
            fetchFileUrls();
        } catch (error) {
            console.error("Upload error:", error);
            setError("File upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const [fileUrls, setFileUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error1, setError1] = useState(null);

    const fetchFileUrls = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/drive/getUrls/${topicid}`, {
                method: "GET",
            });
            setFileUrls(data);
            // eslint-disable-next-line no-unused-vars
        } catch (error1) {
            setError1("Failed to load file URLs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFileUrls();
    }, [topicid]);

    return (
        <div className="flex-1 p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-l-2xl bg-gradient-to-br from-blue-100 to-indigo-300">
            <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Subject Title */}
                <div className="bg-gradient-to-r from-indigo-700 to-blue-500 p-6 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-12">
                    <h1 className="text-3xl font-bold text-white tracking-wide text-center sm:text-left flex-1">
                        {topicData.subjectName} <span className="text-4xl font-extrabold">/ </span> {topicData.unitName}
                        <span className="text-4xl font-extrabold"> / </span> {topicData.topicName}
                    </h1>
                    <div
                        className="bg-gray-50 text-gray-800 rounded-lg px-6 py-3 border border-gray-300 shadow-lg max-w-md sm:max-w-lg text-center sm:text-left flex-1">
                        {topicData.topicDescription}
                    </div>
                </div>

                {/* Upload Container */}
                <div
                    className="bg-gradient-to-r from-indigo-600/10 to-blue-500/10 p-6 rounded-lg shadow-md flex flex-col items-center gap-4">
                    {/* Drag & Drop Input */}
                    <div
                        className={`w-full p-5 border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition ${
                            dragActive ? "border-blue-500 bg-blue-100/30" : "border-gray-300 border-dashed"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p className="text-gray-700 font-medium">Drag & Drop your file here</p>
                        <p className="text-gray-500 text-sm">or</p>
                        <label className="cursor-pointer text-blue-600 font-semibold hover:underline">
                            Click to select a file
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden"/>
                        </label>
                        {file && <p className="mt-2 text-sm text-gray-800">{file.name}</p>}
                    </div>

                    {/* Description Input */}
                    <input
                        type="text"
                        placeholder="Enter file comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Upload Button */}
                    <button
                        onClick={uploadFile}
                        disabled={uploading}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        <UploadCloud size={20} className={uploading ? "text-gray-300" : "text-white"}/>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-600 font-medium">{error}</p>}

                    <FileUrlsComp topicId={topicid} fileUrls={fileUrls} loading={loading} error={error1}/>

                </div>
            </div>
        </div>
    );
}
