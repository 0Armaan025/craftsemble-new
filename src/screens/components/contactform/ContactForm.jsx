import React, { useState } from 'react';
import './contactform.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const recipientEmail = "armaan33000@gmail.com";

  const handleEmailSubmission = () => {
    const subject = `Contact Us Submission from ${name}`;
    const body = `${message}`;
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    
    window.location.href = mailtoLink;
  };

  return (
    <>
      <div className="contactForm">
        <h2 className='contactFormHeading' style={{color: '#fffffe'}}>Contact Us!</h2>
        <br />
        <div className="theboxes">
          <div className="leftBox">
            <form>
              <input
                type="text"
                placeholder="Name"
                className="contactFormInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /><br /><br />
              <input
                type="text"
                placeholder="Email"
                className="contactFormInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br /><br />
              <textarea
                placeholder="Message"
                className="contactFormInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              /><br /><br />
              <input
                type="button"
                value="Submit"
                className="submitBtn"
                onClick={handleEmailSubmission}
              />
            </form>
          </div>
          <div className="rightBox">
            <img
              src="https://media4.giphy.com/media/KszkcokOMwO6s2aJ99/giphy.gif?cid=ecf05e471hmz175c6gxf1sfr6hfgcpfrkha1warkj9wpricj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              style={{ height: "350px", width: "100%", maxWidth: "350px", borderRadius: "10px", boxShadow: "2px 2px 1px 1px black", marginLeft: "10rem" }}
            />
          </div>
        </div>
        <br /><br /><br />
      </div>
    </>
  );
}

export default ContactForm;
