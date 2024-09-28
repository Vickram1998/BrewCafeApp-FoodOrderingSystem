import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ items, addToCart, removeFromCart }) => {
  const [itemCounts, setItemCounts] = useState({}); 

  const handleAddToCart = (item) => {
    const currentCount = itemCounts[item._id] || 0;
    const newCount = currentCount + 1;

    setItemCounts({
      ...itemCounts,
      [item._id]: newCount,
    });

    addToCart(item); 
  };

  const handleRemoveFromCart = (item) => {
    const currentCount = itemCounts[item._id] || 0;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setItemCounts({
        ...itemCounts,
        [item._id]: newCount,
      });
      removeFromCart(item._id); 
    }
  };

  return (
    <section className="menu">
      <h2>Our Menu</h2>
      <div className="menu-items">
        {items.map((item) => (
          <div className="menu-item" key={item._id}>
            <img className="food-img" src={`http://localhost:8080/${item.imageUrl}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="price">₹ {item.price.toFixed(2)}</span>

            <div className="quantity-controls">
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>

              {itemCounts[item._id] > 0 && (
                <div>
                  <button className="increase-btn" onClick={() => handleAddToCart(item)}>+</button>
                  <button
                    className="decrease-btn"
                    onClick={() => handleRemoveFromCart(item)}
                    disabled={itemCounts[item._id] === 0}
                  >
                    -
                  </button>
                  <div>Quantity: {itemCounts[item._id]}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
