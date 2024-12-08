import { useState, useEffect } from "react";

const Art = () => {
  const CRAFTS_ART_PATH = "http://localhost:5000/api/crafts";
  const [arts, setArts] = useState([]);
  const [formData, setFormData] = useState({ _id: "", type: "" });
  const [editMode, setEditMode] = useState(false);

  // Fetch initial data from API
  useEffect(() => {
    fetch(`${CRAFTS_ART_PATH}/get`)
      .then((res) => res.json())
      .then((res) => setArts(res));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for add/update
  const handleSubmit = (e) => {
    

    if (editMode) {
      // Update existing data
      fetch(`${CRAFTS_ART_PATH}/update_details/${formData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: formData.type }),
      })
        .then((res) => res.json())
        .then((updatedArt) => {
          setArts(
            arts.map((art) => (art._id === updatedArt._id ? updatedArt : art))
          );
          resetForm();
        });
    } else {
      // Add new data
      fetch(`${CRAFTS_ART_PATH}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newArt) => {
          setArts([...arts, newArt]);
          resetForm();
        });
    }
    e.preventDefault();
  };

  // Handle edit button click
  const handleEdit = (art) => {
    setFormData({ _id: art._id, type: art.type });
    setEditMode(true);
  };

  // Handle delete button click
  const handleDelete = (_id) => {
    fetch(`${CRAFTS_ART_PATH}/delete_details/${_id}`, {
      method: "DELETE",
    }).then(() => setArts(arts.filter((art) => art._id !== _id)));
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData({ _id: "", type: "" });
    setEditMode(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Artwork ID:</td>
              <td>
                <input
                  type="text"
                  name="artworkId"
                  value={formData._id}
                  onChange={handleInputChange}
                  required
                  disabled={editMode} // Prevent editing ID in edit mode
                />
              </td>
            </tr>
            <tr>
              <td>Artwork Name:</td>
              <td>
                <input
                  type="text"
                  name="artworkName"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">
                  {editMode ? "Update Artwork" : "Add Artwork"}
                </button>
                {editMode && <button onClick={resetForm}>Cancel Edit</button>}
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h3>Artwork List</h3>
      <ul>
        {arts.map((art) => (
          <li key={art._id}>
            ID: {art._id} - Name: {art.type}{" "}
            <button onClick={() => handleEdit(art)}>Edit</button>
            <button onClick={() => handleDelete(art._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Art;
