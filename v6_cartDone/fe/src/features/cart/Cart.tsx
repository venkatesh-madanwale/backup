import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCart, deleteCartItem, fetchCart, incrementCart } from './cartSlice';
import { AppDispatch, RootState } from '../../app/store';
import "./Cart.css"

const Cart: React.FC = () => {
  const uid = JSON.parse(localStorage.getItem('auth') || '{}')?.uid || '';
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart(uid));
  }, [dispatch, uid]);

  return (
    <div className="cart-container">
  <h2 className="cart-title">Your Cart</h2>
  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}
  {items.map(item => (
    <div key={item._id} className="cart-item">
      <div className="item-info">
        <h4>{item.name}</h4>
        <p>₹{item.price} × {item.qty}</p>
      </div>
      <div className="item-controls">
        <button onClick={() => dispatch(incrementCart(item._id))}>+</button>
        <button onClick={() => dispatch(decrementCart(item._id))}>-</button>
        <button className="remove-button" onClick={() => dispatch(deleteCartItem(item._id))}>Remove</button>
      </div>
    </div>
  ))}
</div>

  );
};

export default Cart;
