import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start">
      <div className="container p-5" style={{borderRadius: "20px"}}>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase" style={{fontSize: "32px", color: "#fffffe"}}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text" style={{color: "#fffffe",fontSize: "19px"}}>Home</a>
              </li>
              <li>
                <a href="#!" className="text" style={{color: "#fffffe",fontSize: "19px"}}>Workshops</a>
              </li>
              <li>
                <a href="#!" className="text" style={{color: "#fffffe",fontSize: "19px"}}>Projects</a>
              </li>
              <li>
                <a href="#!" className="text" style={{color: "#fffffe",fontSize: "19px"}}>About Us</a>
              </li>
              <li>
                <a href="#!" className="text" style={{color: "#fffffe",fontSize: "19px"}}>Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12">
            <h5 className="text-uppercase" style={{color: "#fffffe", fontSize: "32px"}}>Newsletter</h5>
            <p style={{color: "#fffffe",fontSize: "18px"}}>Subscribe to our newsletter for the latest updates and craft inspiration.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your Email" aria-label="Your Email" aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{marginLeft: "20px"}}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2);" }}>
        © {new Date().getFullYear()} Craftsemble. All rights reserved.
        
      </div>
    </footer>
  );
}

export default Footer;
