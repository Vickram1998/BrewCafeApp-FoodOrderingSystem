import React,{ useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      console.log(username)
    }
  }, []);

  return (
    <header className="header">
      {/* {!username?<div>You are not logged in 
        <button onClick={()=>{ navigate('/login')}}>Login</button>
      </div>:<h2>{username}</h2>} */}
      <h1 className="cafe-name">Brew</h1>
      <p className="tagline">Crafting moments, one brew at a time</p>
      <nav className='header-nav'>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">LogOut</Link>

      </nav>
    </header>
  );
};

export default Header;
