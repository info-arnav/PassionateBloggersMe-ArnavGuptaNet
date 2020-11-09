import React from "react";
import Footer from "../elements/Footer";
import Navigation from "../elements/Navigation";

const About = () => {
  return (
    <div>
      <Navigation />
      <h1>load</h1>
      <main className="page landing-page">
        <section className="clean-block clean-hero" id="homeImage">
          <div className="text">
            <h2>Blogs for all </h2>
            <p>share your blogs with the world</p>
            <a
              href="/register"
              className="btn btn-outline-light btn-lg"
              type="button"
            >
              Callaborate
            </a>
          </div>
        </section>
        <section className="clean-block about-us">
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">About</h2>
              <p>
                CloudBlog is a platform where various people can share their
                blogs with each other they can als follow the users they like.
                We will be adding additional features in the future.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
