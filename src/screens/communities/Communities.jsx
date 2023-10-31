import React, { useState, useEffect } from 'react';
import './communities.css';
import Navbar from '../components/navbar/Navbar';
import CommunityCard from './community_card/CommunityCard';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 

const Communities = () => {
  const [communityData, setCommunityData] = useState([]);
  
  const db = getFirestore();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communitiesCollectionRef = collection(db, 'communities');
        const querySnapshot = await getDocs(communitiesCollectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCommunityData(data);
      } catch (error) {
      
      }
    };

    fetchCommunityData();
  }, [db]);

  return (
    <div className="communities">
      <Navbar />
      <br />
      <br />
      <h1 className="communitiesHeading" style={{ color: '#fffffe' }}>
        Let's explore some of the communities!
      </h1>
      <center>
        <h5 style={{color: "#b8c1ec"}}>
          Wanna have your listed here!? You can do that{' '}
          <Link to="/list-a-community">HERE</Link>
        </h5>
      </center>
      <br />
      <div className="community-list">
        {communityData.map((community, index) => (
          <div key={index}>
            <CommunityCard
              communityImage={community.profileImageUrl}
              communityName={community.communityName}
              communityDescription={community.description}
              communityLink={community.joinLink}
            />
            <br />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Communities;
