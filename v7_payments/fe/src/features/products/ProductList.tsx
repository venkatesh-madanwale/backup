import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { AppDispatch, RootState } from '../../app/store';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const auth = localStorage.getItem('auth');
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const uid = JSON.parse(localStorage.getItem('auth') || '{}')?.uid || '';

  const userEmail = user?.emailid;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="product-container">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          id={p._id ?? ''}
          name={p.name}
          price={p.price}
          desc={p.desc}
          pimg={p.pimg ?? ''}
          onAddToCart={() => {
            if (!user || !user.emailid) {
              alert("Please login first.");
              return;
            }

            dispatch(
              addToCart({
                uid: user.emailid,
                pid: p._id ?? '',
                name: p.name,
                price: p.price,
                pimg: p.pimg ?? '',
                qty: 1
              })
            ).then(() => {
              const proceed = window.confirm("Product added to cart. Continue shopping?");
              if (!proceed) {
                navigate("/cart");
              }
            });
          }}
          onBuyNow={() => navigate(`/products/${p._id}`)}
          onImageClick={() => navigate(`/products/${p._id}`)}
        />
      ))}
    </div>
  );
};

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  desc: string;
  pimg: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onImageClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  desc,
  pimg,
  onAddToCart,
  onBuyNow,
  onImageClick,
}) => (
  <div className="product-card" style={{ cursor: 'pointer' }}>
    <img
      src={`http://localhost:3002/prodimgs/${pimg}`}
      alt={name}
      className="product-image"
      onClick={(e) => {
        e.stopPropagation();
        onImageClick();
      }}
    />
    <div className="product-info">
      <h3 className="product-name">{name}</h3>
      <p className="product-price">₹{price}</p>
      <p className="product-desc">{desc}</p>
      <button className="buy-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
        Add to cart
      </button>
      <button className="buy-btn" onClick={(e) => { e.stopPropagation(); onBuyNow(); }}>
        View Details
      </button>
    </div>
  </div>
);

export default ProductList;
