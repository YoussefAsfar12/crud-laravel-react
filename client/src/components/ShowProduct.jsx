import  { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const ShowProduct = () => {
  const productId = useParams().id;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Error fetching product:", error);
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/products/${id}`
        );
        console.log("Product deleted successfully:", response.data.message);
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {notFound ? (
        // Display NotFound component if product is not found
        <PageNotFound />
      ) : !loading && product ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Product Details</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Name:</strong> {product.name}
            </div>
            <div className="mb-3">
              <strong>Description:</strong> {product.description}
            </div>
            <div className="mb-3">
              <strong>Price:</strong> ${product.price}
            </div>
            <div className="mb-3">
              <strong>Quantity:</strong> {product.quantity}
            </div>
            {product.image && (
              <div className="mb-3">
                <img
                  src={`http://localhost:8000/storage/${product.image}`}
                  className="w-50"
                  alt={product.name}
                />
              </div>
            )}
            <div>
              <Link
                to={`/products/${product.id}/edit`}
                className="btn btn-primary me-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowProduct;
