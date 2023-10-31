import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          content={blog.content}
          author={blog.author}
        />
      ))}
    </div>
  );
};

export default BlogList;
