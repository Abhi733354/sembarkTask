import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Container } from 'react-bootstrap';

import '../App.css';


const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Container>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => removeFromCart(item.id)} 
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Link to="/">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </Container>
  );
};

export default Cart;
