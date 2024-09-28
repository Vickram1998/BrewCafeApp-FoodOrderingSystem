import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import About from './components/About';
import Footer from './components/Footer';
import OrderList from './components/OrderList';
import Home from './components/Home';
import RegistrationPage from './components/Registration';
import LoginPage from './components/Login';
import Logout from './components/LogOut';
import Lottie from 'lottie-react';
import animationData from './Animation/Loader.json';
import confirmationData from './Animation/confirmation.json';
import useItems from './hooks/useItems';
import useOrders from './hooks/useOrders';
import { postOrder } from './api'; 
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  const { items, loading: itemsLoading } = useItems(token);
  const { orders, loading: ordersLoading } = useOrders(token);
  
  const addToCart = (item) => {
    if (!token) { 
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    if (!token) {  
      alert('Please log in to remove items from your cart.');
      navigate('/login');
      return;
    }
    setCart(cart.filter(cartItem => cartItem._id !== itemId)); 
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleOrder = async () => {
    if (!token) { 
      alert('Please log in to place your order.');
      navigate('/login');
      return;
    }

    getLocation();
    if (location) {
      try {
        setIsLoading(true);  
        await postOrder(cart, location, token);
        setCart([]);
        setShowConfirmation(true);
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing the order. Please try again.');
      } finally {
        setIsLoading(false); 
      }
    }
  };

  return (
    <div className="App">
      <Header />
      {isLoading && (
        <div className="loader-container">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}
      {showConfirmation && (
        <div className="confirmation-container">
          <Lottie 
            animationData={confirmationData} 
            onComplete={() => setShowConfirmation(false)} 
            loop={false} 
          />
        </div>
      )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/logout" element={<Logout />} /> 
      {!itemsLoading && !ordersLoading && !showConfirmation && (
        <>
        <Route path="/menu" element={<Menu items={items} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart cart={cart} handleOrder={handleOrder} removeFromCart={removeFromCart} />} />
          <Route path="/orders" element={<OrderList orders={orders} />} />
        </>
      )}
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
