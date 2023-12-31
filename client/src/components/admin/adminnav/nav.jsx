import './Nav.css';
import logout from '../../../img/logout.png'
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Nav = (prop) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className='nav-container'>
    <div className="nav-container1">
    <h2 className='pageTitle'>{prop.pageTitle}</h2>
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    
        <ul className={`nav-ul  ${isOpen ? 'open' : ''}`}>
            <li className={`nav-li home${prop.active}`}><Link to="/admindashboard">Home</Link></li>
            <li className={`nav-li register${prop.active}`}><Link to='/register'>Register User</Link></li>
            <li className={`nav-li issue${prop.active}`}><Link to='/issuing'>Issue Book</Link></li>
            <li className={`nav-li return${prop.active}`}><Link to='/returning'>Return Book</Link></li>
            <li className={`nav-li add${prop.active}`}><Link to='/addbook'>Add Book</Link></li>
            <li className={`nav-li remove${prop.active}`}><Link to='/removebook'>Remove Book</Link></li>
            <li className="nav-li "><Link to='/'><img className="logout" src={logout} alt='Log out'/></Link></li>
        </ul>
        </div>
    </div>
    </div>
  )
}

export default Nav