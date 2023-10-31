import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import './workshopsscreen.css';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';

import {
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore';

const WorkshopsScreen = () => {
  const [workshops, setWorkshops] = useState([]);
  
  useEffect(() => {
    // Initialize Firestore
    const db = getFirestore();
    const workshopsCollectionRef = collection(db, 'workshops'); // Replace with your collection name

    // Retrieve workshop data
    const getWorkshopData = async () => {
      try {
        const querySnapshot = await getDocs(workshopsCollectionRef);
        const workshopData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkshops(workshopData);
      } catch (error) {
        
      }
    };

    getWorkshopData();
  }, []);

  return (
    <>
    <Navbar />
    <div className="workshopsScreen" style={{padding: "30px"}}>
      
      <div className="workshops-container" style={{background: "none", padding: "30px",  border: "1px solid #121629",marginBottom: "20px", marginTop: "20px"}}>
        <h1 className='workshopsHeading' style={{ color: "#fffffe" , background: "none"}}>Upcoming Workshops!</h1>
        <center style={{background: "none"}}><h4 style={{ background: "none" }}> <Link to="/workshop-creation" style={{ background: "none" , color: "#b8c1ec"}}>Click here to make a request for a workshop!</Link></h4></center>
        <br />
        <div className="workshop-grid" style={{padding: "20px"}}>
          {workshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card">
              <img src={workshop.bannerImage} alt={workshop.title} className="workshop-image" />
              <h3 className="workshop-title" style={{ background: "transparent" }}>{workshop.title}</h3>
              <p className="workshop-date">Date:</p> <p className="workshop-date" style={{ fontWeight: "600", color: "black" }}>{workshop.date}</p>
              <p className="workshop-description">{workshop.description}</p>
              <p className="workshop-hosted">Hosted by:</p> <p className='workshop-hosted' style={{ fontWeight: "bold", color: "black" }}>{workshop.hostedBy}</p>
              <Link to={`/workshop-registration/${workshop.id}`} style={{background: "none"}}><button className="register-button">Register</button></Link>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default WorkshopsScreen;
