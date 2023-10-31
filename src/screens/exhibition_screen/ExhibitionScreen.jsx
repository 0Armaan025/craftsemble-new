import React, { useState, useEffect } from 'react';
import './exhibitionscreen.css';
import Navbar from '../components/navbar/Navbar';
import ExhibitionCard from './ExhibitionCard';
import Footer from '../components/footer/Footer';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const ExhibitionScreen = () => {
  const [craftData, setCraftData] = useState([]);

  useEffect(() => {
    // Initialize Firestore
    const db = getFirestore();

    
    const craftsCollectionRef = collection(db, 'exhibition');

    // Fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(craftsCollectionRef);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCraftData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="exhibition-screen">
      <Navbar />
      <div className="exhibition-header">
        <br/>
        <h2 className="exhibitions-heading" style={{color: "#fffffe"}}>🔥🎨 Welcome to the Crafts Exhibition!!! 🤩💫</h2>
        <h4 className="exhibitions-subheading" style={{color: "#b8c1ec"}}>
          <center>
          Share your crafts with the world!{' '}
          <a href="/upload-craft" className="upload-link">
            Upload Here
          </a>
          </center>
        </h4>
      </div>

      <div className="exhibition-row">
        {craftData.map((craft) => (
          <ExhibitionCard
            key={craft.id}
            imageUrl={craft.imageUrl}
            title={craft.imageName}
            isCollaborate={craft.isCollaborative}
            artist={craft.name}
            projectId={craft.id} // Pass projectId here
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExhibitionScreen;
