import React from 'react'
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.png'
import './Navbar.css'
import { AiFillCaretDown } from "react-icons/ai";
import styled from 'styled-components'
const Navbar = () => {

  return (
    <nav className='navbar'>
    <div className='navbar-logo'>
      <Link to="/">
        <img src={Logo} alt="app logo" />
      </Link>
      
    </div>
    <ul className='navbar-links'>
      <li className="lks"><Link to="/">Home</Link></li>      
      <li className="lks"><Link to="/courses">Courses</Link></li>      

      <div className="dropdown">
        <button className="dropbtn">User<AiFillCaretDown/></button>
        <div className="dropdown-content">
          <Link to="/teacher">Teacher</Link>
          <Link to="/student">Student</Link>
        </div>
      </div>
            

      <li className="lks"><a href="#about">About</a></li>
      <li className="lks"><Link to="/contact">Contact</Link></li>
    </ul>
    <div className="navbar-login">
      <Link to="/login" className='lks'>Login/Register</Link>
      <div></div>
      <Link to="/login" className='lks'>Sign Up</Link>
    </div>
  </nav>
  )
}
export default Navbar
