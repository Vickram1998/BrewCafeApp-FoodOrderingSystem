// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getItems = async (token) => {
  const response = await axios.get(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const postOrder = async (cart, location, token) => {
  const response = await axios.post(`${API_URL}/orders`, { cart, location }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const getOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export { getItems, postOrder, getOrders };
