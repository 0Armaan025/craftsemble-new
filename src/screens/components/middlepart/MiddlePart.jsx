import React from 'react';
import './middlepart.css';
import ContinueButton from './ContinueButton';
import Features from '../features/Features';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Faq from '../faq/Faq';
import { getFirestore } from 'firebase/firestore';
import ContactForm from '../contactform/ContactForm';
import { doc, setDoc } from 'firebase/firestore';
import BlogsButton from './BlogsButton';
import { Hanko } from '@teamhanko/hanko-elements';
import { addDoc, collection } from "@firebase/firestore"

import {firestore} from '../../../firebase_setup/firebase'
import { getUserData } from '../../../userUtils';
import { useState, useEffect } from "react";
import HallOfFame from '../../../components/hall_of_fame/HallOfFame';

const MiddlePart = () => {

  
  
  const [userExists, setUserExists] = useState(false);
 

  useEffect(() => {
    
    

    

    // Call the getUserData function as a function to get the result and update the state
    getUserData(setUserExists).then((doesUserExist) => {
      setUserExists(doesUserExist);
    });
  }, []);

  return (
    <>
      <div className="middlePart">
        <div className="middleContainer">


          <div className="middleContainer__left_text">
            <h2 className='middleContainer__left_text_text' style={{ color: "#fffffe" }}> ⭐ It's the time to empower the unsung creators! ⭐</h2>

            <h4 className='middleContainer__left_text_text_text' style={{color: "#fffffe"}}>"Elevate Your Craft and Ignite Collaborative Creations."</h4>
            <br />
            <div className="buttons">
              <ContinueButton />
              <div className="spac" style={{ width: "2px" }}></div>
              <BlogsButton />
            </div>
          </div>

          <div className="middleContainer__right_text">
            <img src="https://img.freepik.com/free-photo/top-view-attractive-woman-hands-drawing-amazing-picture-canvas-modern-cozy-art-workshop_574295-563.jpg?w=826&t=st=1697122524~exp=1697123124~hmac=bbfb0e34b2a96eb12ee81b86fadd1a491e9ef431cc852e3c5d8214ab6f74c614" alt="this was an image" className="right_image" />
          </div>


        </div>
        <hr style={{color: "white"}} color='white'/>
        <Features />
        <br />
        <br />
        <br/>
        <hr color='white' style={{color: "white"}}/>
        
        <HallOfFame />
        <br />
        <br />
        <Faq />
        <br />
        <br />
        <hr  color='white' style={{color: "white"}}/>
        <br />
        <br />
        <ContactForm />
        
      </div>
    </>
  )
}

export default MiddlePart;
