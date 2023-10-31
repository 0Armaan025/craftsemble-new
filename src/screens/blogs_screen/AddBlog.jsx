import React, { useState } from 'react';
import './addblog.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Hanko } from '@teamhanko/hanko-elements';

const AddBlog = () => {
  const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
  const hanko = new Hanko(hankoApi);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'content' && value.length > 200) {
      
      setFormData({
        ...formData,
        content: value.slice(0, 200),
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
    const db = getFirestore();

    try {
      const usersCollectionRef = collection(db, "blogs");

      const currentUser = hanko.user.getCurrent();
      if (currentUser !== null) {
        
        const {id} = currentUser;
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let docName = formData.title;
        const user1DocRef = doc(usersCollectionRef, docName);

        let userData = null;

        if (id) {
          userData = {
            ...formData,
            id,
          };
        }
        else {
          userData = {
            ...formData,
          };
        }

        

        await setDoc(user1DocRef, userData);
        

      }
    } catch (error) {
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-blog-screen">
        <h1 style={{ color: 'white' }}>Add a Blog</h1>
        <form className="blog-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleFormChange}
            required
          />
          <button type="submit" className="publishButton">
            Publish
          </button>
        </form>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;
