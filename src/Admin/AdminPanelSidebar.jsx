// import React, { useEffect, useState } from "react";
// import "./CSS/AdminPanelSidebar.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const AdminPanelSidebar = ({ onSelectArt }) => {
//   const [arts, setArts] = useState([]);
//   const [editingArtId, setEditingArtId] = useState(null);
//   const [newArtName, setNewArtName] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [artToDelete, setArtToDelete] = useState(null);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API}/get`)
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log(data.message);
//         // console.log(data.crafts);
//         setArts(data.crafts)})
//       .catch((error) => console.error("Error fetching arts:", error));
//   }, []);

//   // Handle edit button click
//   const handleEdit = (art) => {
//     setEditingArtId(art._id);
//     setNewArtName(art.type);
//   };

//   // Handle art name update with PATCH API call
//   const handleUpdate = async (artId) => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API}/update/${artId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ type: newArtName }),
//       });
//       if (response.ok) {
//         setArts((prevArts) =>
//           prevArts.map((art) =>
//             art._id === artId ? { ...art, type: newArtName } : art
//           )
//         );
//         setEditingArtId(null);
//         setNewArtName("");
//       } else {
//         console.error("Error updating art:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating art:", error);
//     }
//   };

//   // Handle delete confirmation
//   const handleDelete = (artId) => {
//     setShowDeleteModal(true);
//     setArtToDelete(artId);
//   };

//   // Confirm delete with API call
//   const confirmDelete = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API}/delete/${artToDelete}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setArts((prevArts) =>
//           prevArts.filter((art) => art._id !== artToDelete)
//         );
//         setShowDeleteModal(false);
//         setArtToDelete(null);
//       } else {
//         console.error("Error deleting art:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting art:", error);
//     }
//   };
//   return (
//     <div className="sidebar">
//       <h2>Arts</h2>
//       <ul>
//         {arts.map((art) => (
//           <li
//             key={art._id}
//             className="art-item"
//             onClick={() => onSelectArt(art)}
//           >
//             {editingArtId === art._id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={newArtName}
//                     onChange={(e) => setNewArtName(e.target.value)}
//                     className="edit-input"
//                   />
//                   <button
//                     onClick={() => handleUpdate(art._id)}
//                     className="save-btn"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingArtId(null)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <span>{art.type}</span>
//                   <div className="icon-buttons">
//                     <FaEdit
//                       onClick={() => handleEdit(art)}
//                       className="icon edit-icon"
//                     />
//                     <FaTrash
//                       onClick={() => handleDelete(art._id)}
//                       className="icon delete-icon"
//                     />
//                   </div>
//                 </>
//               )}
//           </li>
//         ))}
//       </ul>
//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//           <div className="modal">
//             <div className="modal-content">
//               <p>Are you sure you want to delete this art?</p>
//               <button onClick={confirmDelete} className="btn confirm-btn">
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="btn cancel-bttn"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default AdminPanelSidebar;

import React, { useEffect, useState } from "react";
import "./CSS/AdminPanelSidebar.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineExpandMore } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";

const AdminPanelSidebar = ({ onSelectArt }) => {
  const [arts, setArts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [newArtName, setNewArtName] = useState("");
  const [newTestimonial, setNewTestimonial] = useState("");
  const [showAddArtModal, setShowAddArtModal] = useState(false);
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [handleApi, setHandleApi] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    // Fetch arts
    fetch(`${process.env.REACT_APP_API}/get`)
      .then((res) => res.json())
      .then((data) => setArts(data.crafts))
      .catch((error) => console.error("Error fetching arts:", error));

    // Fetch testimonials
    fetch(`${process.env.REACT_APP_API}/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, [handleApi]);

  // Add new art
  const addNewArt = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: newArtName }),
      });
      if (response.ok) {
        const newArt = await response.json();
        setArts([...arts, newArt]);
        setShowAddArtModal(false);
        setNewArtName("");
        setHandleApi(!handleApi);
      }
    } catch (error) {
      console.error("Error adding art:", error);
    }
  };

  // Add new testimonial
  const addNewTestimonial = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/testimonials/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newTestimonial }),
        }
      );
      if (response.ok) {
        const newTest = await response.json();
        setTestimonials([...testimonials, newTest]);
        setShowAddTestimonialModal(false);
        setNewTestimonial("");
        setHandleApi(!handleApi);
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const onSave = async (art) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/update/${art._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: newArtName }),
        }
      );
      if (response.ok) {
        setHandleApi(!handleApi);
        setNewArtName("");
        setIsEditable(!isEditable);
      }
    } catch (error) {
      console.error("Error updating art:", error.message);
    }
  };

  const onEditArt = async (art) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/get/${art._id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch art: ${response.statusText}`);
      }

      const data = await response.json();

      if (data?.crafts) {
        setArts(data.crafts);
        setHandleApi(!handleApi);
        setIsEditable(!isEditable);
      } else {
        throw new Error("No crafts data found in the response.");
      }
    } catch (error) {
      console.error("Error editing art:", error.message);
    }
  };
  const onDeleteArt = async (art) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/delete/${art._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setHandleApi(!handleApi);
      } else {
        console.error("Error deleting art:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting art:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <h2>Arts</h2>
          <span className={`accordion-icon ${isAccordionOpen ? "open" : ""}`}>
            {isAccordionOpen ? (
              <MdOutlineExpandMore />
            ) : (
              <MdOutlineExpandMore />
            )}
          </span>
        </div>
        {isAccordionOpen && (
          <>
            <ul className="accordion-content">
              {/* {arts.map((art) => (
                <li
                  key={art._id}
                  className="art-item"
                  onClick={() => onSelectArt(art)}
                >
                  {art.type}
                </li>
              ))} */}
              {arts.map((art) => (
                <li key={art._id} className="art-item">
                  {isEditable && (
                    <span onClick={() => onSelectArt(art)}>{art.type}</span>
                  )}
                  {!isEditable && (
                    <input type="text" value={art.type} onChange={() => {}} />
                  )}

                  {/* Edit Button */}
                  {isEditable && (
                    <FaEdit
                      className="edit-bttn"
                      onClick={() => onEditArt(art)}
                    />
                  )}
                  {/* Save Button */}
                  {!isEditable && (
                    <CiSaveUp1
                      className="save-bttn"
                      onClick={() => onSave(art)}
                    />
                  )}

                  {/* Delete Button */}
                  <FaTrash
                    className="delete-btn"
                    onClick={() => onDeleteArt(art)}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAddArtModal(true)}
              className="add-art-button"
            >
              Add Art
            </button>
          </>
        )}
      </div>

      <div className="testimonial">
        {/* <ul>
        {testimonials.map((testimonial) => (
          <li key={testimonial._id} className="testimonial-item">
            <span>{testimonial.content}</span>
            <FaTrash
              onClick={async () => {
                await fetch(`${process.env.REACT_APP_API}/testimonials/delete/${testimonial._id}`, {
                  method: "DELETE",
                });
                setTestimonials(testimonials.filter((t) => t._id !== testimonial._id));
              }}
              className="icon delete-icon"
            />
          </li>
        ))}
      </ul> */}
        <button
          onClick={() => setShowAddTestimonialModal(true)}
          className="testimonials-button"
        >
          Testimonials
        </button>
      </div>

      {/* Add Art Modal */}
      {showAddArtModal && (
        <div className="sidebar-modal">
          <div className="sidebar-modal-content">
            <h2>Add New Art</h2>
            <input
              className="art-input"
              type="text"
              value={newArtName}
              onChange={(e) => setNewArtName(e.target.value)}
              placeholder="Enter art name"
            />
            <button onClick={addNewArt} className="btn confirm-btn">
              Add Art
            </button>
            <button
              onClick={() => setShowAddArtModal(false)}
              className="btn cancel-bttn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Testimonial Modal */}
      {showAddTestimonialModal && (
        <div className="sidebar-modal">
          <div className="sidebar-modal-content">
            <h2>Add New Testimonial</h2>
            <textarea
              value={newTestimonial}
              onChange={(e) => setNewTestimonial(e.target.value)}
              placeholder="Enter testimonial"
            />
            <button onClick={addNewTestimonial} className="btn confirm-btn">
              Add
            </button>
            <button
              onClick={() => setShowAddTestimonialModal(false)}
              className="btn cancel-btn"
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
