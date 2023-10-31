import React from 'react';
import './blogs.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ author, title, content }) => {
  const shortContent = content.substring(0, 30);
  const fullContent = content;

  return (
    <div className="blog-card">
      <h2 style={{color: "black"}}>{title}</h2>
      <p style={{color: "black"}}>Author: {author}</p>
      <p style={{fontSize: "16px", color: "blue"}}>{shortContent}...</p>
      <Link to={`/blog/${title}`} style={{background: "none"}}>Read More</Link>
    </div>
  );
};

export default BlogCard;
