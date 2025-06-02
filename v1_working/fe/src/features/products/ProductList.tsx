// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from './productSlice';
// import { AppDispatch, RootState } from '../../app/store';
// import './ProductList.css';
// import { useNavigate } from 'react-router-dom';

// const ProductList: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { products, loading, error } = useSelector((state: RootState) => state.products);

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="product-container">
//             {products.map((p) => (
//                 <div className="product-card" key={p._id}>
//                     <img
//                         // src={`file:///C://Users//Venkatesh//Desktop//submission//backend//prodimgs//${p.pimg}`}
//                         src={`http://localhost:3002/prodimgs/${p.pimg}`}
//                         alt={p.name}
//                         className="product-image"
//                     />
//                     <div className="product-info">
//                         <h3 className="product-name">{p.name}</h3>
//                         <p className="product-price">₹{p.price}</p>
//                         <p className="product-desc">{p.desc}</p>
//                         <button className="buy-btn">Add to cart</button>
//                         <button className="buy-btn">Buy now</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductList;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { AppDispatch, RootState } from '../../app/store';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="product-container">
            {products.map((p) => (
                <div
                    className="product-card"
                    key={p._id}
                    onClick={() => navigate(`/products/${p._id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={`http://localhost:3002/prodimgs/${p.pimg}`}
                        alt={p.name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3 className="product-name">{p.name}</h3>
                        <p className="product-price">₹{p.price}</p>
                        <p className="product-desc">{p.desc}</p>
                        <button className="buy-btn">Add to cart</button>
                        <button className="buy-btn">Buy now</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;