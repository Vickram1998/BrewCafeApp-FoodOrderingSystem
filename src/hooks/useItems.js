import { useState, useEffect } from 'react';
import { getItems } from '../api';

const useItems = (token) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getItems(token);
        setItems(itemsData);
      } catch (error) {
        setError('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
    if (token) {
    }
  }, [token]);

  return { items, loading,error };
};

export default useItems;
