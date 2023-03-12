import React from 'react'
import './About.css'
const About = () => {
  return (
    <>

        <div id='about' className='about-container'>
          <h1 className='heading'>
              About Us
          </h1>
          <p className='para'>
            <strong style={{color:'#cd7851'}}>LEARNIFY</strong> aims at providing quality content to every child. Live classes, video lectures, test series, lecturewise notes, topicwise assignment with best questions, dynamic exercise and much more.
          </p>
  
        <div className="container">
          <h1>Join us Now !</h1>
          <form action="noaction.php">
              <div className="form-group">
                  <input type="number" placeholder="Enter your phone number" required/>
              </div>
              <div className="form-group">
                  <input type="text" placeholder="Email" required/>
              </div>
              <button className="btn">Submit</button>
          </form>
        </div>
        </div>
    </>
    
  )
}

export default About
