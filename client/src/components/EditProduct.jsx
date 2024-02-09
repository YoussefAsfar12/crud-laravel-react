import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const productId = useParams().id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setErrors(null);

      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
        const productData = response.data;
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          image: null,
        });
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          setErrors(error.response ? error.response.data.message : 'An error occurred');
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
    setErrors(null);

    try {
      const formDataObj = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        image: formData.image,
      };

      const validated = await axios.put(`http://localhost:8000/api/products/${productId}`, formDataObj);
      console.log(validated.data);
      setSuccess(true);
    } catch (error) {
      setErrors(error.response ? error.response.data.errors : ['An error occurred']);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      {success && <p className="alert alert-success">Product updated successfully!</p>}
      {notFound && <p className="alert alert-danger">Product not found</p>}

      {errors && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}

      {!notFound && !loading && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity:</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
