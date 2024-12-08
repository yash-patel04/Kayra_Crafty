import React, { useEffect, useState } from "react";
import "./CSS/AdminPanelSidebar.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminPanelSidebar = ({ onSelectArt }) => {
  const CRAFTS_ART_PATH = "http://localhost:5000/api/crafts";
  const [arts, setArts] = useState([]);
  const [editingArtId, setEditingArtId] = useState(null);
  const [newArtName, setNewArtName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [artToDelete, setArtToDelete] = useState(null);

  useEffect(() => {
    fetch(`${CRAFTS_ART_PATH}/get`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.message);
        // console.log(data.crafts);
        setArts(data.crafts)})
      .catch((error) => console.error("Error fetching arts:", error));
  }, []);

  // Handle edit button click
  const handleEdit = (art) => {
    setEditingArtId(art._id);
    setNewArtName(art.type);
  };

  // Handle art name update with PATCH API call
  const handleUpdate = async (artId) => {
    try {
      const response = await fetch(`${CRAFTS_ART_PATH}/update/${artId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: newArtName }),
      });
      if (response.ok) {
        setArts((prevArts) =>
          prevArts.map((art) =>
            art._id === artId ? { ...art, type: newArtName } : art
          )
        );
        setEditingArtId(null);
        setNewArtName("");
      } else {
        console.error("Error updating art:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating art:", error);
    }
  };

  // Handle delete confirmation
  const handleDelete = (artId) => {
    setShowDeleteModal(true);
    setArtToDelete(artId);
  };

  // Confirm delete with API call
  const confirmDelete = async () => {
    try {
      const response = await fetch(`${CRAFTS_ART_PATH}/delete/${artToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setArts((prevArts) =>
          prevArts.filter((art) => art._id !== artToDelete)
        );
        setShowDeleteModal(false);
        setArtToDelete(null);
      } else {
        console.error("Error deleting art:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting art:", error);
    }
  };
  return (
    <div className="sidebar">
      <h2>Arts</h2>
      <ul>
        {arts.map((art) => (
          <li
            key={art._id}
            className="art-item"
            onClick={() => onSelectArt(art)}
          >
            {editingArtId === art._id ? (
                <>
                  <input
                    type="text"
                    value={newArtName}
                    onChange={(e) => setNewArtName(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => handleUpdate(art._id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingArtId(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{art.type}</span>
                  <div className="icon-buttons">
                    <FaEdit
                      onClick={() => handleEdit(art)}
                      className="icon edit-icon"
                    />
                    <FaTrash
                      onClick={() => handleDelete(art._id)}
                      className="icon delete-icon"
                    />
                  </div>
                </>
              )}
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this art?</p>
              <button onClick={confirmDelete} className="btn confirm-btn">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn cancel-bttn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminPanelSidebar;
