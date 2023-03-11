import React from 'react'
import react from '../logo.svg'  
import './Navbar.css'
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Navbar() {
  return (
    <div className="navbar">
        <div className="navbar_branding">
          <img src={react} alt="" className='navbar_logo' />
          <h1>Learnify</h1>
        </div>
        <div className="login_details">
            <p>Surendra Kumar Mishra</p>
            <Avatar />
            <ArrowDropDownIcon />
        </div>
    </div>
  )
}

export default Navbar