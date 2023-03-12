import React from 'react'
import react from '../logo.svg'  
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Navbar(props) {
  // console.log(props);
  return (
    <div className="navbar">
        <div className="navbar_branding">
          <img src="/learnify_logo.png" alt="" className='navbar_logo' />
          <h1>Learnify</h1>
        </div>
        <div className="navbar_right">
          <div className="navbar_options">
            <ul>
              <li><Link exact to="/">Courses</Link></li>
              <li><Link exact to="/">Teachers</Link></li>
              <li><Link exact to="/">About Us</Link></li>
            </ul>
          </div>
          <div className="login_details">
              {/* <p>{props.userData.userName}</p>   */}
              <Avatar src={props.userData.img} sx={{ width: 50, height: 50 }}/>
              <ArrowDropDownIcon />
          </div>
        </div>
    </div>
  )
}

export default Navbar