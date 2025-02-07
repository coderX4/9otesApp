import { useEffect, useState } from "react";
import fetchInstance  from "../FetchInstance.js";

export default function UserComp() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        fetchInstance("http://localhost:8082/api/user/getAllUser", {
            method: "GET",
        })
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    };



    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-5xl mt-[-15rem]">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User List</h2>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">User Id</th>
                            <th scope="col" className="px-6 py-3">User Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Password</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 border-b dark:border-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {user.id}
                                    </th>
                                    <td className="px-6 py-4">{user.uname}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.password}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No Users found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
