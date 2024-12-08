import { useState, useEffect } from "react";

const Product = () => {
  const CRAFTS_PRODUCT_PATH = "http://localhost:5000/api/crafts";
  const [products, setProducts] = useState([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [productDetails, setProductDetails] = useState([]);
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

  // Handle artwork selection and populate form fields
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission for adding or updating product
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Set the URL and method based on whether we're updating or adding a new product
    const url = selectedProduct.productId
      ? `${CRAFTS_PRODUCT_PATH}/update_details/${selectedProduct.artId}/${selectedProduct.productId}`
      : `${CRAFTS_PRODUCT_PATH}/add`;
    const method = selectedProduct.productId ? "PATCH" : "POST";
  
    let fetchOptions;
  
    if (selectedProduct.productImage) {
      // If `productImage` is present, use FormData for the request
      const formData = new FormData();
      Object.keys(selectedProduct).forEach((key) => {
        formData.append(key, selectedProduct[key]);
      });
      fetchOptions = {
        method,
        body: formData,
      };
    } else {
      // If no file, use JSON format
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
        // Reset the selectedProduct to initial state
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
      })
      .catch((error) => console.error("Failed to submit:", error));
  };
  
  // Handle delete
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

  // Handle edit by selecting product
  const handleEdit = (detail) => {
    setSelectedProduct({
      ...selectedProduct,
      productId: detail._id,
      productName: detail.name,
      productDescription: detail.descriptions,
      productPrice: detail.price,
      productSize: detail.size,
      productAvailable: detail.available ? "yes" : "no",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th colSpan="2">Artwork</th>
            </tr>
            <tr>
              <td>Select Artwork:</td>
              <td>
                <select name="artwork" onChange={handleArtworkSelect} required>
                  <option value="">Select Artwork</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.type}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th colSpan="2">Product Details</th>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={selectedProduct.productName}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Description:</td>
              <td>
                <textarea
                  name="productDescription"
                  value={selectedProduct.productDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Product Price:</td>
              <td>
                <input
                  type="number"
                  name="productPrice"
                  value={selectedProduct.productPrice}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Size:</td>
              <td>
                <input
                  type="text"
                  name="productSize"
                  value={selectedProduct.productSize}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Product Available:</td>
              <td>
                <input
                  type="radio"
                  name="productAvailable"
                  value="yes"
                  checked={selectedProduct.productAvailable === "yes"}
                  onChange={handleInputChange}
                />{" "}
                Yes
                <input
                  type="radio"
                  name="productAvailable"
                  value="no"
                  checked={selectedProduct.productAvailable === "no"}
                  onChange={handleInputChange}
                />{" "}
                No
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">
                  {selectedProduct.productId ? "Update Product" : "Add Product"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h3 key={selectedProduct._id}>
        Product Details of {selectedProduct.artName}
      </h3>

      <ul>
        {productDetails.map((detail) => (
          <li key={detail._id}>
            <strong>{detail.name}</strong> - Size: {detail.size}, Price: $
            {detail.price}
            <p>Description: {detail.descriptions}</p>
            <p>Available: {detail.available ? "Yes" : "No"}</p>
            <button onClick={() => handleEdit(detail)}>Edit</button>
            <button onClick={() => handleDelete(detail._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Product;
