import React, { useState } from 'react';
import 'firebase/firestore';
import './listascommunityscreen.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { getFirestore } from 'firebase/firestore';
import { collection, setDoc, doc } from 'firebase/firestore';
import { newStorage } from '../../firebase_setup/firebase';
import { Hanko } from '@teamhanko/hanko-elements';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ListACommunityScreen = () => {
  const db = getFirestore();

  const [formData, setFormData] = useState({
    communityName: '',
    joinLink: '',
    description: '',
    targetAudience: '',
    bannerImage: null,
  });

  const handleFormChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      const imageFile = event.target.files[0];
      setFormData({
        ...formData,
        [name]: imageFile,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const communitiesCollectionRef = collection(db, "communities");
      const communityDocRef = doc(communitiesCollectionRef, formData.communityName);

      const profileImageRef = ref(newStorage, `/community-banners/${formData.communityName}`);
      const profileUploadTask = uploadBytesResumable(profileImageRef, formData.bannerImage);
      await profileUploadTask;

      const profileImageUrl = await getDownloadURL(profileImageRef);

      const communityData = {
        communityName: formData.communityName,
        joinLink: formData.joinLink,
        description: formData.description,
        targetAudience: formData.targetAudience,
        profileImageUrl,
      };

      await setDoc(communityDocRef, communityData);

      

      setFormData({
        communityName: '',
        joinLink: '',
        description: '',
        targetAudience: '',
        bannerImage: null,
      });
    } catch (error) {
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="listACommunityScreen">
        <br/>
        <h1 className='listCommunityHeading' style={{ color: "white" }}>💫List your community here!😎</h1>
        <form className="theboxes" onSubmit={handleSubmit}>
          <div className="leftBox">
            <input
              type="text"
              name="communityName"
              placeholder="Name of the community."
              className="contactFormInput"
              value={formData.communityName}
              onChange={handleFormChange}
              required
            />
            <br /><br />
            <input
              type="text"
              name="joinLink"
              placeholder="A link for joining the group?"
              className="contactFormInput"
              value={formData.joinLink}
              onChange={handleFormChange}
              required
            />
            <br /><br />
            <input
              type="text"
              name="description"
              placeholder="A description for the community."
              className="contactFormInput"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
            <br /><br />
            <input
              type="text"
              name="targetAudience"
              placeholder="For whom is it?"
              className="contactFormInput"
              value={formData.targetAudience}
              onChange={handleFormChange}
              required
            />
            <br /><br />
            <label htmlFor="bannerImage" style={{ color: "#b8c1ec" }}>Please add a banner picture</label>
            <input
              type="file"
              name="bannerImage"
              id="bannerImage"
              accept="image/*"
              onChange={handleFormChange}
              required
            />
            <br /><br />
            <input type="submit" value="Submit" className="submitBtn" />
          </div>
          <div className="rightBox" style={{marginLeft: "30px"}}>
            <img
              src="https://media4.giphy.com/media/KszkcokOMwO6s2aJ99/giphy.gif?cid=ecf05e471hmz175c6gxf1sfr6hfgcpfrkha1warkj9wpricj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              style={{ height: "350px", width: "100%", maxWidth: "350px", borderRadius: "10px", boxShadow: "2px 2px 1px 1px black" }}
            />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ListACommunityScreen;
