import { useEffect, useState } from "react";
import axios from "axios";

import OngletTitle from "../hooks/OngletTitle";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  OngletTitle("Dashboard Admin");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/`);
        setUsers(response.data.users);
      } catch {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/auth/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <h3 className="text-center">Liste des utilisateurs</h3>
      <ul
        className="list-group"
        style={{ display: "flex", flexDirection: "column-reverse" }}
      >
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <p className="mb-1">
                <strong>{user.name}</strong> - {user.email}
              </p>
            </div>
            <div>
              <button
                className="btn btn-danger w-100"
                onClick={() => deleteUser(user._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
