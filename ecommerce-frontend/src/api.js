import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const addProduct = (formData) => instance.post("/product/add", formData);
export const getAllProducts = () => instance.get("/product/view");
export const getProductDetails = (productId) => instance.get(`/product/${productId}`);
export const updateProduct = (productId, formData) => instance.put(`/product/update/${productId}`, formData);
export const deleteProduct = (productId) => instance.delete(`/product/${productId}`);
// Cart APIs
export const addToCart = (productId, userId, productName, productImg, productPrice) =>
  instance.post('/cart/add', { productId, userId, productName, productImg, productPrice });

export const removeFromCart = (productId, userId) =>
  instance.post('/cart/remove', { productId, userId });

export const updateCartItem = (productId, quantity, userId) =>
  instance.post('/cart/update', { productId, quantity, userId });

export const viewCart = (userId) =>
  instance.get(`/cart/view/${userId}`);

export default instance;
