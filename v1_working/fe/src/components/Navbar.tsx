import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">MyStore</div>

      {/* Center Links */}
      <div className="navbar-center">
        <Link to="/products">
        <button className="nav-btn">Products</button>
        </Link>
        <Link to="/addproducts">
        <button className="nav-btn">AddProducts</button>
        </Link>
        
        {/* <div className="dropdown">
          <button className="nav-btn" onClick={() => setShowDropdown(!showDropdown)}>
            Categories ▾
          </button>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><button className="dropdown-btn">Category 1</button></li>
              <li><button className="dropdown-btn">Category 2</button></li>
              <li><button className="dropdown-btn">Category 3</button></li>
            </ul>
          )}
        </div> */}
      </div>

      <div className="navbar-auth">
        <button className="auth-btn">
          <Link to="/signin" >Login</Link>
        </button>
        <button className="auth-btn">
          <Link to="/cart">Cart</Link>
        </button>
        <button className="auth-btn">
          <Link to="/signup">Register</Link>
        </button>
        <button className="auth-btn">
          <Link to="/logout">Logout</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
