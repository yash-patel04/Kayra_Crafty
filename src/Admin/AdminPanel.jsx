import React, { useState, useEffect } from "react";
import "./CSS/AdminPanel.css";

const AdminPanel = ({ selectedArt }) => {
  const CRAFTS_PRODUCT_PATH = "http://localhost:5000/api/crafts";
  const [products, setProducts] = useState({});
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

  // Fetch Data
  useEffect(() => {
    if (selectedArt) {
      // setProductDetails(selectedArt.details || []);
      fetch(`${CRAFTS_PRODUCT_PATH}/get/${selectedArt._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.craft);
          setProducts(data.craft)})
        .catch((error) => console.error("Failed to fetch products:", error));
    }
  }, [selectedArt]);

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${CRAFTS_PRODUCT_PATH}/update_details/${selectedArt.artId}/${selectedArt.productId}`;
    const method = "PATCH";

    let fetchOptions;

    if (selectedArt.productImage) {
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
              detail._id === selectedArt.productId ? data : detail
            )
          );
        }
        setSelectedProduct({
          artId: selectedArt._id,
          artName: selectedArt.type,
          productId: selectedArt.details._id,
          productName: selectedArt.details.name,
          productDescription: selectedArt.details.description,
          productPrice: selectedArt.details.price,
          productSize: selectedArt.details.size,
          productAvailable: selectedArt.details.available ? "yes" : "no",
        });
        setEditMode(true);

        // setSelectedProduct({
        //   artId: "",
        //   artName: "",
        //   productId: "",
        //   productName: "",
        //   productDescription: "",
        //   productPrice: "",
        //   productImage: null,
        //   productSize: "",
        //   productAvailable: "yes",
        // });
        // setEditMode(false);
      })
      .catch((error) => console.error("Failed to submit:", error));
  };

  // Input Change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Back button
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

  // Edit Product
  const handleEdit = (detail) => {
    setSelectedProduct({
      artId: selectedArt,
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

  // Delete Product
  const handleDelete = (productId) => {
    console.log("Delete clicked for product ID:", productId);
    fetch(`${CRAFTS_PRODUCT_PATH}/delete/${selectedArt._id}/${productId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete product");
        }
        setProducts((prevProducts) => ({
          ...prevProducts,
          details: prevProducts.details.filter(
            (detail) => detail._id !== productId
          ),
        }));
      })
      .catch((error) => console.error("Failed to delete product:", error));
  };

  return (
    <div className="admin-panel">
      {/* {console.log(selectedArt._id)} */}
      {editMode && (
        <>
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
        </>
      )}
      {selectedArt ? (
        <div>
          <h2>Products for {selectedArt.type}</h2>
          <div className="cards-container">
            {products.details?.length > 0 ? (
              products.details?.map((detail) => (
                <div key={detail._id} className="card">
                  <img className="adminCardImage"
                    src={detail.image || "https://via.placeholder.com/150"}
                    alt={detail.name || "Product Image"}
                  />
                  <h3>{detail.name}</h3>
                  <p>
                    <strong>Description:</strong> {detail.description}
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
              ))
            ) : (
              <p>No products available for this artwork.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Please select an artwork from the sidebar to view products.</p>
      )}
    </div>
  );
};

export default AdminPanel;
