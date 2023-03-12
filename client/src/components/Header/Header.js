import React from 'react'
import image from '../../assets/back_img3.png'
import './Header.css'
const Header = () => {
  return (
    <>
    {/* <div className="wrapper"> </div> */}
     <div className="wrapper-img">
     <img src={image} alt="header_img" />
    </div>
    </>
    
  )
}

export default Header
