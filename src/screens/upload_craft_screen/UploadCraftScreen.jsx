import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { newStorage } from '../../firebase_setup/firebase';

const BecomeAnArtisanScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageName: '',
    collaboration: false,
    agreeToTerms: false,
  });
  const [stars, setStars] = useState(0);
  const [craftImage, setCraftImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCraftImageChange = (e) => {
    const file = e.target.files[0];
    setCraftImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms || (!formData.name || !formData.email || !craftImage)) {
      alert('Please fill out all required fields and agree to the terms.');
      return;
    }

    const db = getFirestore();
    var today = new Date();
    const artisanDocRef = doc(db, 'exhibition', today.toString());

    const artisanData = {
      name: formData.name,
      email: formData.email,
      isCollaborative: formData.collaboration,
      imageName: formData.imageName,
      stars: stars,
    };

    try {
      await setDoc(artisanDocRef, artisanData);

      const imageRef = ref(newStorage, `/craftImages/${artisanDocRef.id}/${formData.imageName}`);
      const uploadTask = uploadBytesResumable(imageRef, craftImage);
      await uploadTask;

      const imageUrl = await getDownloadURL(imageRef);

      await setDoc(artisanDocRef, { imageUrl }, { merge: true });

      alert('Artisan data and image submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <div className="becomeAnArtisanScreen">
        <Navbar />
        <br />
        <center>
          <h2 className="formHeading" style={{ color: "#fffffe" }}>🤔 Let's upload your art!🥳</h2>
          <br />
          <h4 className="formShowing" style={{ color: "#b8c1ec" }}>We would need you to submit some details, please :)</h4>
          <div className="theboxes">
            <div className="leftBox">
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" className="contactFormInput" name="name" value={formData.name} onChange={handleInputChange} /><br /><br />
                <input type="text" placeholder="Email" className="contactFormInput" name="email" value={formData.email} onChange={handleInputChange} /><br /><br />
                <input type="text" placeholder="Your masterpiece title" className="contactFormInput" name="imageName" value={formData.imageName} onChange={handleInputChange} /><br /><br />
                <label htmlFor="craftImage" style={{color: "#b8c1ec"}}>Craft image</label>
                <br />
                <input
                  type="file"
                  className="form-control-file"
                  id="craftImage"
                  name="craftImage"
                  accept="image/*"
                  onChange={handleCraftImageChange}
                />
                <br />
 
                <label style={{color: "#b8c1ec"}}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  I agree to the <a href="https://www.termsandconditionsgenerator.com/live.php?token=0C1A7QlBuET1Xn7I90Al0ZPNR4GIbDpU" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>.
                </label>
                <br />
                <br />
                <input type="submit" value="Submit" className="submitBtn" />
              </form>
            </div>
            <div className="rightBox" style={{marginLeft: "30px"}}>
              <img
                src="https://media4.giphy.com/media/KszkcokOMwO6s2aJ99/giphy.gif?cid=ecf05e471hmz175c6gxf1sfr6hfgcpfrkha1warkj9wpricj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                style={{ height: "350px", maxWidth: "100%", borderRadius: "10px", boxShadow: "2px 2px 1px 1px black" }}
              />
            </div>
          </div>
        </center>
      </div>
      <Footer />
    </>
  )
}

export default BecomeAnArtisanScreen;
