import React from 'react';
import './homescreen.css';
import Navbar from '../components/navbar/Navbar';
import MiddlePart from '../components/middlepart/MiddlePart';
import Features from '../components/features/Features';
import Footer from '../components/footer/Footer';
import { Hanko } from '@teamhanko/hanko-elements';
import { getUserData } from '../../userUtils';
import { useState, useEffect } from "react";
import { redirect } from 'react-router-dom';

const HomeScreen = () => {

  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    
    getUserData(setUserExists).then((doesUserExist) => {
      setUserExists(doesUserExist);
    });

    if (userExists == false) {
      redirect('/hanko-auth');
    }
  }, []);

  return (
    <>
    <div className="homeScreen">
        <center>
            <Navbar/>
            {/* <!--Middle part time here --> */}
            <MiddlePart/>
            {/* <!--Footer part time here --> */}
            <Footer/>
        </center>
    </div>
    </>
  )
}

export default HomeScreen
