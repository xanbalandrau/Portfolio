import { useState } from "react";
import { FaCog } from "react-icons/fa";

const SettingsButton = ({
  theme,
  skillCard,
  setTheme,
  setSkill,
  handleUpdateTheme,
  handleUpdateSkill,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container d-flex justify-content-end settings">
      {/* Bouton pour ouvrir le modal */}
      <button className="btn btn-icon" onClick={handleShowModal}>
        <FaCog className="icon" />
      </button>

      {/* Modal pour afficher et modifier les paramètres */}
      {showModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog mt-5 pt-5">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title text-black">Paramètres</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Sélection du thème */}
                <div className="mb-4">
                  <h2 className="text-black">Thème</h2>
                  <select
                    className="form-select mb-2"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="DarkTheme">Dark</option>
                    <option value="LightTheme">Light</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateTheme}
                  >
                    Mettre à jour le thème
                  </button>
                </div>

                {/* Sélection de la compétence */}
                <div className="mb-4">
                  <h2 className="text-black">Compétence</h2>
                  <select
                    className="form-select mb-2"
                    value={skillCard}
                    onChange={(e) => setSkill(e.target.value)}
                  >
                    <option value="card">Carte</option>
                    <option value="circle">Cercle</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateSkill}
                  >
                    Mettre à jour la compétence
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
