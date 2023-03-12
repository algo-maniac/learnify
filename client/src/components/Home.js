import React from 'react'
import About from './About/About'
import Header from './Header/Header'
import Heading from './Heading/Heading'
import Navbar from './Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Heading/>
      <About/>
    </div>
  )
}

export default Home
