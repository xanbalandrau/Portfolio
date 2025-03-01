import { useEffect, useState } from "react";
import axios from "axios";

import OngletTitle from "../hooks/OngletTitle";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  OngletTitle("Dashboard Admin");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

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
            className="list-group-item d-flex justify-content-between align-items-center w-75 mx-auto"
          >
            <div>
              <p className="mb-1">
                <strong>{user.name}</strong> - {user.email}
              </p>
            </div>
            <div>
              <button
                className="btn btn-danger w-100"
                onClick={handleShowModal}
              >
                Supprimer
              </button>
            </div>
            {showModal && (
              <div
                className="modal"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirmer la suppression</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCloseModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      Etes-vous sur de vouloir supprimer cet utilisateur ?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteUser(user._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
