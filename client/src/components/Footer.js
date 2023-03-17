import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="upper-part">
          <div className="about-section">
            <h5 className="headin5_amrc col_white_amrc pt2">About us</h5>
            <p className="mb10" style={{"text-align":"left"}}>
            <b>Learnify</b> is a ed - tech website with amazing doubt posting/solving and teacher-student interaction features
            </p>
            <p style={{"text-align":"left"}}>
              <i className="fa fa-location-arrow"></i>Kolkata, India
            </p>
            <p style={{"text-align":"left"}}>
              <i className="fa fa-phone"></i> 93XXXXXXXX
            </p>
            <p style={{"text-align":"left"}}>
              <i className="fa fa fa-envelope"></i> learnify@gmail.com
            </p>
            <p style={{"text-align":"left"}}>
              For Contribution <a href='https://github.com/algo-maniac/learnify' style={{"color":"black","textDecoration":"none"}} target="_blank">Link</a>
            </p>
          </div>

          <div className="link-section">
            <h5>Quick links</h5>
            <ul className="links-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/teachers">Teachers</Link>
              </li>
              <li>
                <Link to="/exam-corner">Exam-Corner</Link>
              </li>
            </ul>
          </div>

          <div className="title-section" id="title-header">
            <Link to="/home" class="footer-title">
              <img
                src="/learnify_logo.png"
                width="300px"
                height="200px"
                style={{"margin":"auto"}}
                alt=""
                className='logo'
              ></img>
            </Link>
          </div>
        </div>

        <div className="lower-part">
          <p className="text-center" style={{"color":"white"}}>
            Copyright <i className="fa fa-copyright" aria-hidden="true">C</i> |
            Made by Learnify
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
