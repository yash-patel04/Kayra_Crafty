const ProductList = ({ productDetails, handleEdit, handleDelete }) => (
  <div className="cards-container">
    {productDetails.map((detail) => (
      <div key={detail._id} className="card">
        <img
          src={detail.image || "https://via.placeholder.com/150"}
          alt={detail.name}
        />
        <h3>{detail.name}</h3>
        <button onClick={() => handleEdit(detail)} className="edit-button">
          Edit
        </button>
        <button
          onClick={() => handleDelete(detail._id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default ProductList;
