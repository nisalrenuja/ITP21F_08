import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import BlogCard from "../../../component/BlogCard/BlogCard";
import blogs from "../../BlogModules/BlogList/BlogListData.json";

const responsive = {
  0: {
    items: 1.3,
  },
  370: {
    items: 1.2,
  },
  411: {
    items: 1.3,
  },
  414: {
    items: 1.3,
  },
  600: {
    items: 2,
  },
  768: {
    items: 2.25,
  },
  1000: {
    items: 3,
  },
  1200: {
    items: 3,
  },
  1400: {
    items: 3.3,
  },
  1700: {
    items: 4,
  },
};

const BlogsComponent = () => (
  <div className="past-event-container pt-5">
    <h1 className="event-header">Our Clients</h1>

    <div className="container-fluid">
      <OwlCarousel
        className="owl-theme"
        dots={false}
        loop
        margin={70}
        responsive={responsive}
      >
        {blogs.data.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            title={blog.title}
            datetime={blog.datetime}
            description={blog.description}
            link={blog.link}
            tags={blog.tags}
            mediumProfileImg={blog.mediumProfileImg}
          />
        ))}
      </OwlCarousel>
    </div>
  </div>
);

export default BlogsComponent;
