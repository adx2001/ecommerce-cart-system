import { useEffect, useState } from "react";
import { getAllProducts, addToCart } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductLists = ({ userId }) => {
  const [products, setProducts] = useState([]);

  const BASE_URL = "http://localhost:5000";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(
        product._id,
        userId,
        product.name,
        product.image,
        product.price
      );
      toast.success(`${product.name} added to cart successfully!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="rounded-lg shadow-lg overflow-hidden bg-white transform hover:scale-105 transition-transform"
        >
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-2">${product.price}</p>

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLists;
