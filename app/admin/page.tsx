// pages/admin.tsx
"use client";
import { getUsers } from "@/pages/api/appwriteConfig";
import React, { useState, useEffect } from "react";

// Define the user type
interface User {
  $id: string;
  email: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = (userId: string) => {
    // Remove the user from the UI
    setUsers((prevUsers) => prevUsers.filter((user) => user.$id !== userId));
    // You might want to add logic here to delete the user from your backend/API
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-8 text-black">Welcome Admin, Active Users</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : users.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Serial Number</th>
                <th className="py-2 px-4 border-b pl-4">Email ID</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.$id}>
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b pl-4">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteUser(user.$id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
