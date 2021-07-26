import React from 'react';
import BlogCard from '../../../component/BlogCard/BlogCard';
import blogs from './BlogListData.json';
import './BlogListStyle.css';

const BlogList = () => (
  <div className="blogListPolygonDiv">
    <div className="past-event-container">
      <h1 className="event-header">Blogs List</h1>
      <div className="container-fluid ">
        <div className="row">
          {blogs.data.map((blog) => (
            <div className="col-lg-4 col-md-3 col-sm-12" key={blog.id}>
              <BlogCard
                image={blog.image}
                title={blog.title}
                datetime={blog.datetime}
                description={blog.description}
                link={blog.link}
                tags={blog.tags}
                mediumProfileImg={blog.mediumProfileImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default BlogList;
