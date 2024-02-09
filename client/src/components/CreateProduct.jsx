import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataObj = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        image: formData.image,
      }
      console.log(formDataObj);
      const data=await axios.post('http://localhost:8000/api/products/', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data.data);
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.errors);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Create Product</h2>
      {success && <p className="alert alert-success">Product created successfully!</p>}
      {error && <p className="alert alert-danger">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">Quantity:</label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
