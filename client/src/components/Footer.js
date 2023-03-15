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
              <i className="fa fa fa-envelope"></i> XXtuhinXX@gmail.com
            </p>
          </div>

          <div className="link-section">
            <h5>Quick links</h5>
            <ul className="links-list">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/teachers">Teachers</a>
              </li>
              <li>
                <a href="/exam-corner">Exam-Corner</a>
              </li>
            </ul>
          </div>

          <div className="title-section" id="title-header">
            <a href="/home" class="footer-title">
              <img
                src="/learnify_logo.png"
                width="300px"
                height="200px"
                style={{"margin":"auto"}}
                alt=""
                className='logo'
              ></img>
            </a>
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
