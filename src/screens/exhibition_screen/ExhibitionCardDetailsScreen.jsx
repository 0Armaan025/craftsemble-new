import React, { useState, useEffect } from 'react';
import './exhibitioncarddetailsscreen.css';
import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firebase Firestore functions
import { useParams } from 'react-router-dom';
import { Hanko } from '@teamhanko/hanko-elements';

const ExhibitionCardDetailsScreen = () => {
  const { projectId } = useParams(); // Get projectId from the URL

  const [exhibitionDetails, setExhibitionDetails] = useState({
    imageUrl: '',
    uploadDate: '',
    artistName: '',
    artistEmail: '',
    isCollaborator: false,
    stars: 0, 
    uids: [], 
  });

  const [isStarred, setIsStarred] = useState(false);
  const [currentUserStarred, setCurrentUserStarred] = useState(false); 


  const handleFavoriteClick = async () => {
    if (!isStarred) {
      try {
        const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
        const hanko = new Hanko(hankoApi);
        const currentUser = hanko.user.getCurrent();
        const { id } = await currentUser;
  
        
        if (Array.isArray(exhibitionDetails.uids) && exhibitionDetails.uids.includes(id)) {
          setCurrentUserStarred(true);
        } else {
         
          const db = getFirestore();
          const exhibitionDocRef = doc(db, 'exhibition', projectId);
  
         
          await updateDoc(exhibitionDocRef, {
            stars: exhibitionDetails.stars + 1,
            uids: arrayUnion(id),
          });
  
          setIsStarred(true);
  
          const docSnapshot = await getDoc(exhibitionDocRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setExhibitionDetails(data);
          }
        }
      } catch (error) {
        
      }
    }
  };
  

  useEffect(() => {
    
    const db = getFirestore();
    const exhibitionDocRef = doc(db, 'exhibition', projectId); // Replace 'exhibition' with your collection name

   
    const fetchExhibitionDetails = async () => {
      const docSnapshot = await getDoc(exhibitionDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setExhibitionDetails(data);
      } else {
        
      }
    };

    fetchExhibitionDetails();
  }, [projectId]);

  return (
    <>
    <Navbar/>
    <br/>
    <center>
        <h2 style={{color: "white"}}> ⭐ You are now looking at an amazing piece of craft! ⭐ </h2>
    </center>
    <div className="exhibition-card-details">
      <div className="banner">
        <img src={exhibitionDetails.imageUrl} alt="Craft Image" className='craftImage' />
      </div>
      <div className="details">
        <h2>{exhibitionDetails.artistName}'s Craft</h2>
        <p style={{fontSize: "16px"}}>Uploaded on {projectId}</p>
        
        {exhibitionDetails.isCollaborator && (
          <p>Collaborator: Yes</p>
        )}
        <h3 style={{background: "none"}}> Total Stars now = {exhibitionDetails.stars}</h3>
        <br/>
        <button onClick={handleFavoriteClick} disabled={isStarred || currentUserStarred} className='star-button'>⭐</button>
        <Link to="/send-message" style={{background: "none"}}><button className='message-button'>Message them</button></Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ExhibitionCardDetailsScreen;
