// fullblog.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './fullblog.css';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const FullBlog = () => {
  const { blogId } = useParams();
  const [fullContent, setFullContent] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchBlogData = async () => {
      const blogRef = doc(db, 'blogs', blogId);

      try {
        const blogSnapshot = await getDoc(blogRef);
        if (blogSnapshot.exists()) {
          const blogData = blogSnapshot.data();
          
          setFullContent(blogData.content);
        } else {
          
        }
      } catch (error) {
        
      }
    };

    fetchBlogData();
  }, [blogId, db]);

  return (
    <>
    <Navbar/>
    <div className="full-blog">
      <h2>Full Blog</h2>
      <div className="full-blog-content">

        {fullContent}

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FullBlog;
