import { useState, useEffect } from 'react';
import { getOrders } from '../api';

const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(token);
        setOrders(ordersData);
      } catch (error) {
        setError('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  return { orders, loading,error };
};

export default useOrders;
