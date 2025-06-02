import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import axios from 'axios';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // const res = await fetch(`http://localhost:3002/products/${id}`);
                const res = await axios.get(`http://localhost:3002/products/${id}`);
                const data = res.data;
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="product-detail-container">
            <img
                src={`http://localhost:3002/prodimgs/${product.pimg}`}
                alt={product.name}
                className="product-detail-image"
            />
            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p>{product.desc}</p>
                <h2>₹{product.price}</h2>
                <button className="buy-btn">Add to cart</button>
                <button className="buy-btn">Buy now</button>
            </div>
        </div>
    );
};

export default ProductDetail;
