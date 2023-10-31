import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import './workshopsregistrationscreen.css';
import { Hanko } from '@teamhanko/hanko-elements';
import Footer from '../components/footer/Footer';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const WorkshopRegistrationScreen = () => {
  const { workshopId } = useParams();
  const [workshopData, setWorkshopData] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', guardiansPermission: false, artisan: false });
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchWorkshopData = async () => {
      try {
        const db = getFirestore();
        const workshopDocRef = doc(db, 'workshops', workshopId);

        const docSnap = await getDoc(workshopDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkshopData(data);
          const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
        const hanko = new Hanko(hankoApi);
            
        const currentUser = hanko.user.getCurrent();    
        const { id } = await currentUser;

          // Check if the "registrants" collection exists in the document
          const registrantsCollectionRef = collection(workshopDocRef, 'registrants');
          const registrantsQuery = query(registrantsCollectionRef, where('id', '==', id));
          const registrantsSnapshot = await getDocs(registrantsQuery);

          if (!registrantsSnapshot.empty) {
            // User is already registered
            setIsRegistered(true);
          }
        } else {
          
        }
      } catch (error) {
        
      }
    };

    fetchWorkshopData();
  }, [workshopId]);

  const handleFormSubmit = async () => {
    try {
      const db = getFirestore();
      const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
      const hanko = new Hanko(hankoApi);

      const currentUser = hanko.user.getCurrent();
      const { id } = await currentUser;
      const workshopDocRef = doc(db, 'workshops', workshopId);

      // Check if the user has already registered
      const registrantsCollectionRef = collection(workshopDocRef, 'registrants');
      const registrantsQuery = query(registrantsCollectionRef, where('email', '==', formData.email));
      const registrantsSnapshot = await getDocs(registrantsQuery);

      if (!registrantsSnapshot.empty) {
        // User is already registered
        setIsRegistered(true);
        return;
      }

      const newData = {
        ...formData,
        id,
      };

      // Add the user's details to the registrants collection
      await addDoc(collection(workshopDocRef, 'registrants'), newData);

      setIsRegistered(true);
    } catch (error) {
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="workshopRegistrationScreen">
        <br />
        <div className="workshop-registration-container">
          <h1 className="workshop-name" style={{ fontFamily: 'cursive', background: 'transparent' , color: "#fffffe"}}>
            {workshopData ? workshopData.workshopname : 'Workshop Name'}
          </h1>
          <div className="workshop-details" style={{ borderRadius: '30px' }}>
            <div className="workshop-image-container" style={{ marginLeft: '20px' }}>
              <center>
                <img src={workshopData ? workshopData.bannerImage : ''} alt={workshopData ? workshopData.title : 'Workshop Title'} className="workshop-image" />
              </center>
            </div>
            <div className="workshop-info" style={{ borderRadius: '30px' }}>
              <br />
              <h2 className="workshop-title" style={{ fontFamily: 'cursive', background: 'transparent' ,color: "#fffffe"}}>
                {workshopData ? workshopData.title : 'Title of the Workshop'}
              </h2>
              <p className="workshop-description" style={{ background: 'transparent',color: "#b8c1ec" }}>
                {workshopData ? workshopData.description : 'Workshop description'}
              </p>
              <p className="hosted-by" style={{ background: 'transparent',color: "#b8c1ec" }}>
                {workshopData ? `Hosted by: ${workshopData.hostedBy}` : 'Hosted by: John Doe'}
              </p>
              <p className="workshop-time" style={{ background: 'transparent',color: "#b8c1ec" }}>
                {workshopData ? workshopData.dateTime : 'Date and Time: October 10, 2023, 10:00 AM - 2:00 PM'}
              </p>
            </div>
          </div>
          {showRegistration ? (
            <div className="registration-form">
              {isRegistered ? (
                <p style={{ fontSize: "18px", color: "green" }}>You have successfully registered for this workshop!</p>
              ) : (
                <form>
                  <br />
                  <label htmlFor="name" style={{ fontSize: "22px" }}>Name:</label>
                  <input type="text" id="name" name="name" required style={{ width: "500px" }} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                  <label htmlFor="email" style={{ fontSize: "22px" }}>Email:</label>
                  <input type="email" id="email" name="email" required style={{ width: "500px" }} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                  <div>
                    <input type="checkbox" id="guardiansPermission" name="guardiansPermission" onChange={(e) => setFormData({ ...formData, guardiansPermission: e.target.checked })} />
                    <label htmlFor="guardiansPermission" style={{ fontSize: "22px" }}>I have my guardian's permission (if under 16)</label>
                  </div>

                  <div>
                    <input type="checkbox" id="artisan" name="artisan" style={{ width: "100px" }} onChange={(e) => setFormData({ ...formData, artisan: e.target.checked })} />
                    <label htmlFor="artisan" style={{ fontSize: "22px" }}>I am an artisan</label>
                  </div>

                  <input type="button" className='submitBtn' value='Submit' onClick={handleFormSubmit} />
                </form>
              )}
            </div>
          ) : (
            <div className="detailed-info" style={{ borderRadius: '30px', color: "white" }}>
              <center>
                <br />
                <h2 style={{ fontFamily: 'cursive', color: "white" }}>Detailed Information</h2>
                <p className="detailed-description" style={{color: "#b8c1ec"}}>{workshopData ? workshopData.detailedInfo : 'This workshop will cover various topics related to web development, design, and more. Join us for an exciting and informative session.'}</p>
                <div className="myButtons">
                  <input
                    type="button"
                    className="registerBtn"
                    value="Register"
                    onClick={() => setShowRegistration(true)}
                  />
                  <input
                    onClick={() => {
                      alert('in beta!')
                    }}
                    type="button"
                    className="addToGoogleCalendarBtn"
                    value="Add to Google Calendar"
                  />
                </div>
                <br />
              </center>
            </div>
          )}
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default WorkshopRegistrationScreen;
