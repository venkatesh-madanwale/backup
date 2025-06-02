import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import Footer from './components/Footer';
import AddProduct from './features/products/AddProduct';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Cart from './features/cart/Cart';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/addproducts" element={<AddProduct/>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
