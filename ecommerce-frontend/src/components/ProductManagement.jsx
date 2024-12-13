import { useState, useEffect } from "react";
import { addProduct, getAllProducts, updateProduct, deleteProduct } from "../api";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateProductId, setUpdateProductId] = useState(null);
    const BASE_URL = "http://localhost:5000";

    const fetchProducts = async () => {
        try {
            const { data } = await getAllProducts();
            setProducts(data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        if (name === "price") setPrice(value);
        if (name === "stock") setStock(value);
        if (name === "image") {
            const file = e.target.files[0];
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock || !image) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        if (image) formData.append("image", image);

        try {
            if (isUpdating && updateProductId) {
                await updateProduct(updateProductId, formData);
                setIsUpdating(false);
                setUpdateProductId(null);
            } else {
                await addProduct(formData);
            }

            setName("");
            setPrice("");
            setStock("");
            setImage(null);
            setImagePreview(null);
            fetchProducts();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            fetchProducts();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleUpdate = (product) => {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setIsUpdating(true);
        setUpdateProductId(product._id);
        setImagePreview(product.image);
    }

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Product Management</h1>

            <form className="mb-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    value={stock}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border rounded"
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full mt-2"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Product Preview"
                        className="mt-2 w-32 h-32 object-cover rounded"
                    />
                )}

                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                >
                    {isUpdating ? "Update Product" : "Add Product"}
                </button>
            </form>

            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="p-4 bg-gray-100 rounded shadow">
                        <h2 className="font-bold">{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>

                        {product.image && (
                            <img
                                src={`${BASE_URL}${product.image}`}
                                alt="Product"
                                className="w-32 h-32 object-cover rounded mt-2"
                            />
                        )}

                        <button
                            onClick={() => handleUpdate(product)}
                            className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManagement
