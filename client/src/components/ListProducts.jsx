import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        const updatedProducts = response.data.map(product => ({
          ...product,
          image: product.image ? `http://localhost:8000/storage/${product.image}` : null
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        console.log('Product deleted successfully:', response.data.message);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.image && <img src={product.image} width="100" alt={product.name} />}</td>
                <td>
                  <Link to={`/products/${product.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
                </td>
                <td>
                  <Link to={`/products/${product.id}`} className="btn btn-info btn-sm">Details</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListProducts;
