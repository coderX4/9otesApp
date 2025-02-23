import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import fetchInstance from "../../FetchInstance.js";
import Swal from "sweetalert2";

export default function FileUrlsComp({ topicId, fileUrls, loading, error }) {
    const [files, setFiles] = useState([]);

    const storedUser = sessionStorage.getItem("user");
    const { email, password } = JSON.parse(storedUser);
    const credentials = btoa(`${email}:${password}`);

    useEffect(() => {
        setFiles(fileUrls);
    }, [fileUrls]);

    const fetchUrls = async () => {
        try {
            const data = await fetchInstance(`http://localhost:8082/api/drive/getUrls/${topicId}`, {
                method: "GET",
            });
            setFiles(data);
        } catch (err) {
            console.error("Error fetching file urls:", err);
        }
    };

    const deleteFileUrl = async (fileId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append("fileId", fileId);
                    formData.append("folderName", `${email}folder`);
                    await fetch(`http://localhost:8082/api/drive/deletefileurl`, {
                        method: "DELETE",
                        headers: { Authorization: `Basic ${credentials}` },
                        body: formData,
                        credentials: "include",
                    });
                    Swal.fire("Deleted!", "The File has been removed.", "success");
                    fetchUrls();
                } catch (err) {
                    console.error("Error deleting file:", err);
                    Swal.fire("Error!", "Failed to delete the file.", "error");
                }
            }
        });
    };

    const handlePreviewClick = async (fileId) => {
        try {
            const response = await fetchInstance(`http://localhost:8082/api/drive/updatePreview/${fileId}`, {
                method: "GET",
            })
                .then(() => fetchUrls()) // Refresh the file list after updating)

        } catch (err) {
            console.error("Error in setting Preview:", err.message || err);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Uploaded Files</h2>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-10 bg-gray-200 rounded-md"></div>
                    ))}
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : files.length > 0 ? (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">S No.</th>
                            <th className="px-6 py-3">File Name</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Comment</th>
                            <th className="px-6 py-3">Preview</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {files
                            .slice()
                            .reverse() // Reverse the array so last uploaded file appears first
                            .map((fileUrl, index) => (
                                <tr key={fileUrl.id} className="border-b odd:bg-gray-100 even:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{fileUrl.fileName}</td>
                                    <td className="px-6 py-4">{fileUrl.createdOn}</td>
                                    <td className="px-6 py-4">{fileUrl.createdAt}</td>
                                    <td className="px-6 py-4">{fileUrl.comment}</td>
                                    <td className="px-6 py-4">
                                        <Link to={fileUrl.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Open
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 space-x-3">

                                        <button
                                            onClick={() => handlePreviewClick(fileUrl.id)}
                                            className={`p-2 rounded-lg transition duration-200 ${
                                                fileUrl.previewer
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                            title="Preview"
                                        >
                                            <Eye className="w-5 h-5"/>
                                        </button>

                                        <button
                                            onClick={() => deleteFileUrl(fileUrl.id)}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">No files available.</p>
            )}
        </div>
    );
}
