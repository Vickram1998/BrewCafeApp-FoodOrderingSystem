import React from 'react';
import './OrderList.css';

const OrderList = ({ orders }) => {
  return (
    <section className="order-list">
      <h2>New Orders</h2>
      { orders && orders.length === 0 ? (
        <p>No new orders</p>
      ) : (
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order #{index + 1}</h3>
            {order.items.map((item, i) => (
              <p key={i}>{item.name} - ₹ {item.price.toFixed(2)}</p>
            ))}
          </div>
        ))
      )}
    </section>
  );
};

export default OrderList;
