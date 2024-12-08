import React, { useState, useEffect } from "react";
import "./CSS/AdminPanel.css";

const AdminPanel = () => {
  const CRAFTS_PRODUCT_PATH = "http://localhost:5000/api/crafts";
  const [products, setProducts] = useState([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    artId: "",
    artName: "",
    productId: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: null,
    productSize: "",
    productAvailable: "yes",
  });

  useEffect(() => {
    fetch(`${CRAFTS_PRODUCT_PATH}/get`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  const handleArtworkSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedArtworkId(selectedId);

    const selectedArtwork = products.find(
      (product) => product._id === selectedId
    );
    if (selectedArtwork) {
      setSelectedProduct({
        ...selectedProduct,
        artId: selectedArtwork._id,
        artName: selectedArtwork.type,
      });
      setProductDetails(selectedArtwork.details);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = selectedProduct.productId
      ? `${CRAFTS_PRODUCT_PATH}/update_details/${selectedProduct.artId}/${selectedProduct.productId}`
      : `${CRAFTS_PRODUCT_PATH}/add`;
    const method = selectedProduct.productId ? "PATCH" : "POST";

    let fetchOptions;

    if (selectedProduct.productImage) {
      const formData = new FormData();
      Object.keys(selectedProduct).forEach((key) => {
        formData.append(key, selectedProduct[key]);
      });
      fetchOptions = {
        method,
        body: formData,
      };
    } else {
      fetchOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProduct),
      };
    }

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (method === "POST") {
          setProductDetails([...productDetails, data]);
        } else {
          setProductDetails(
            productDetails.map((detail) =>
              detail._id === selectedProduct.productId ? data : detail
            )
          );
        }
        setSelectedProduct({
          artId: "",
          artName: "",
          productId: "",
          productName: "",
          productDescription: "",
          productPrice: "",
          productImage: null,
          productSize: "",
          productAvailable: "yes",
        });
        setEditMode(false);
      })
      .catch((error) => console.error("Failed to submit:", error));
  };

  const handleDelete = (productId) => {
    fetch(`${CRAFTS_PRODUCT_PATH}/delete/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProductDetails(
          productDetails.filter((detail) => detail._id !== productId)
        );
      })
      .catch((error) => console.error("Failed to delete:", error));
  };

  const handleEdit = (detail) => {
    setSelectedProduct({
      artId: selectedArtworkId,
      artName: selectedProduct.artName,
      productId: detail._id,
      productName: detail.name,
      productDescription: detail.descriptions,
      productPrice: detail.price,
      productSize: detail.size,
      productAvailable: detail.available ? "yes" : "no",
    });
    setEditMode(true);
  };

  const handleBack = () => {
    setEditMode(false);
    setSelectedProduct({
      artId: "",
      artName: "",
      productId: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productImage: null,
      productSize: "",
      productAvailable: "yes",
    });
  };

  return (
    <>
      <div className="admin-panel">
        <div className="product-selection">
          <label htmlFor="artwork-select">Select Artwork:</label>
          <select
            id="artwork-select"
            value={selectedArtworkId}
            onChange={handleArtworkSelect}
          >
            <option value="">-- Select Artwork --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.type}
              </option>
            ))}
          </select>
        </div>

        <div className="product-details">
          {editMode ? (
            <form onSubmit={handleSubmit} className="product-form">
              <h2>Edit Product</h2>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={selectedProduct.productName}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="productDescription">Description:</label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={selectedProduct.productDescription}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="productPrice">Price:</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                value={selectedProduct.productPrice}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="productSize">Size:</label>
              <input
                type="text"
                id="productSize"
                name="productSize"
                value={selectedProduct.productSize}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="productAvailable">Available:</label>
              <select
                id="productAvailable"
                name="productAvailable"
                value={selectedProduct.productAvailable}
                onChange={handleInputChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label htmlFor="productImage">Product Image:</label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                onChange={handleInputChange}
              />
              <div className="btn">
                <button
                  type="button"
                  onClick={handleBack}
                  className="back-button"
                >
                  Back
                </button>
                <button type="submit" className="submit-button">
                  Update Product
                </button>
              </div>
            </form>
          ) : (
            selectedArtworkId && (
              <div>
                <h2>Products for {selectedProduct.artName}</h2>
                <div className="cards-container">
                  {productDetails.map((detail) => (
                    <div key={detail._id} className="card">
                      <img
                        src={detail.image || "https://via.placeholder.com/150"}
                        alt={detail.name || "Product Image"}
                      />
                      <h3>{detail.name}</h3>
                      <p>
                        <strong>Description:</strong> {detail.descriptions}
                      </p>
                      <p>
                        <strong>Price:</strong> ${detail.price}
                      </p>
                      <p>
                        <strong>Size:</strong> {detail.size}
                      </p>
                      <p>
                        <strong>Available:</strong>{" "}
                        {detail.available ? "Yes" : "No"}
                      </p>
                      <button
                        onClick={() => handleEdit(detail)}
                        className="edit-button"
                      >
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
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;