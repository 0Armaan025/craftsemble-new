import React from 'react';
import HankoAuth from '../../components/HankoAuth';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const HankoAuthScreen = () => {
  return (
    <>
    <Navbar/>
    <center>
        <br/>
        <br/>
        <h1 style={{color: "#fffffe"}}> Time to get you in the database! </h1>
        <br/>
    <HankoAuth/>
    <br/>
    <br/>
    </center>
    <Footer/>
    </>
  )
}

export default HankoAuthScreen
