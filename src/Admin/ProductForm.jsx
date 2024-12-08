const ProductForm = ({
  selectedProduct,
  handleInputChange,
  handleSubmit,
  handleBack,
}) => (
  <form onSubmit={handleSubmit} className="product-form">
    <h2>{selectedProduct.productId ? "Edit Product" : "Add Product"}</h2>
    <label htmlFor="productName">Product Name:</label>
    <input
      type="text"
      id="productName"
      name="productName"
      value={selectedProduct.productName}
      onChange={handleInputChange}
      required
    />
    {/* Add other input fields similarly */}
    <button type="button" onClick={handleBack} className="back-button">
      Back
    </button>
    <button type="submit" className="submit-button">
      Save
    </button>
  </form>
);

export default ProductForm;
