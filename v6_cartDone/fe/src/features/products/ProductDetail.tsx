import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addToCart } from '../../features/cart/cartSlice';
import './ProductDetail.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  desc: string;
  pimg: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const userEmail = user?.emailid;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!userEmail) {
      alert("Please login first.");
      return;
    }

    if (!product) return;
    dispatch(
      addToCart({
        uid: userEmail,
        pid: product._id,
        name: product.name,
        price: product.price,
        pimg: product.pimg,
        qty: 1,
      })
    ).then(() => {
      const proceed = window.confirm("Product added to cart. Go to cart?");
      if (proceed) {
        navigate("/cart");
      }
    });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <img
        src={`http://localhost:3002/prodimgs/${product.pimg}`}
        className="product-detail-image"
        alt={product.name}
      />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
        <h2>₹{product.price}</h2>
        <button className="buy-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button
          className="buy-btn"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;