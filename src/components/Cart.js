import React, { useState,useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, handleOrder, removeFromCart }) => {
  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [cart]);
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className='cart-items'>
          {cart.map((item, index) => (
            <div className='cart-item' key={index}>
              <img className='food-img' src={`http://localhost:8080/${item.imageUrl}`} alt="Margherita Pizza" />
              <div>{item.name} - ₹{item.price.toFixed(2)}</div>
              <button onClick={() => removeFromCart(index)}>Remove Item</button>
              </div>
            
          ))}
          <div className='grand-total'> 
               Total Amount = ₹{totalAmount.toFixed(2)}
          </div> 
          <button onClick={handleOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
