import axios from "axios";

const API = "http://localhost:8000";

export const fetchProducts = () => axios.get(`${API}/products`);
export const fetchProduct = (id) => axios.get(`${API}/product/${id}`);
export const addToCart = (item) => axios.post(`${API}/cart/add`, item);
export const getCart = () => axios.get(`${API}/cart`);
export const clearCart = () => axios.delete(`${API}/cart/clear`);
export const removeFromCart = (id) => axios.delete(`${API}/cart/remove/${id}`);
