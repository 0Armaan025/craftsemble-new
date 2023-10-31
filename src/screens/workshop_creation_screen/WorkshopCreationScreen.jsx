import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import './workshopcreationscreen.css';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { newStorage } from '../../firebase_setup/firebase';

const WorkshopCreationScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    workshopname: '',
    description: '',
    hostedBy: '',
    dateTime: '',
    detailedInformation: '',
    bannerImage: null,
    workshopMeetingLink: '', // New field for Workshop Meeting Link
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleCheckboxChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();

    // Reference the 'workshops' collection (replace with your collection name)
    const workshopsCollectionRef = collection(db, 'workshops');

    try {
      const profileImageRef = ref(
        newStorage,
        `/workshop-banners/${formData.workshopname}/${formData.bannerImage.name}`
      );
      const profileUploadTask = uploadBytesResumable(profileImageRef, formData.bannerImage);
      await profileUploadTask;

      const profileImageUrl = await getDownloadURL(profileImageRef);

      const workshopData = {
        ...formData,
        bannerImage: profileImageUrl,
      };

      // Replace 'workshopname' with the unique ID or name of the workshop
      const workshopDocRef = doc(workshopsCollectionRef, formData.workshopname);

      await setDoc(workshopDocRef, workshopData);

      

      setFormData({
        title: '',
        workshopname: '',
        description: '',
        hostedBy: '',
        dateTime: '',
        detailedInformation: '',
        bannerImage: null,
        workshopMeetingLink: '', // Clear the Meeting Link field
      });
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="workshopCreationScreen">
        <Navbar />
        <br />
        <center>
          <h2 className="formHeading" style={{ color: '#fffffe' }}>
            Workshop Creation
          </h2>
          <br />
          <h4 className="formShowing" style={{ color: '#b8c1ec' }}>
            Please provide workshop details:
          </h4>
          <div className="theboxes">
            <div className="leftBox">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Workshop Title"
                  name="title"
                  className="contactFormInput"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Workshop Name"
                  name="workshopname"
                  className="contactFormInput"
                  value={formData.workshopname}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Workshop Description"
                  name="description"
                  className="contactFormInput"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Hosted By"
                  name="hostedBy"
                  className="contactFormInput"
                  value={formData.hostedBy}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Date and Time"
                  name="dateTime"
                  className="contactFormInput"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Workshop Meeting Link"
                  name="workshopMeetingLink"
                  className="contactFormInput"
                  value={formData.workshopMeetingLink} // Meeting Link field
                  onChange={handleInputChange}
                />
                <br />
                <textarea
                  placeholder="Detailed Information"
                  name="detailedInformation"
                  className="contactFormInput"
                  value={formData.detailedInformation}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="bannerImage" style={{ color: '#b8c1ec' }}>
                  Banner Image
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="bannerImage"
                  name="bannerImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <br />
                <br />
                <label style={{ color: '#b8c1ec' }}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={handleCheckboxChange}
                  />
                  I agree to the{' '}
                  <a
                    href="https://www.termsandconditionsgenerator.com/live.php?token=0C1A7QlBuET1Xn7I90Al0ZPNR4GIbDpU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
                <input type="submit" value="Submit" className="submitBtn" />
              </form>
            </div>
            <div className="rightBox" style={{marginLeft: "30px"}}>
              <img
                src="https://media4.giphy.com/media/KszkcokOMwO6s2aJ99/giphy.gif?cid=ecf05e471hmz175c6gxf1sfr6hfgcpfrkha1warkj9wpricj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="Workshop Image"
              />
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default WorkshopCreationScreen;
