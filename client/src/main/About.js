import React from "react";
import MetaTags from "react-meta-tags";
import Footer from "../elements/Footer";
import Navigation from "../elements/Navigation";

const About = () => {
  return (
    <div>
      <div>
        <MetaTags>
          <meta
            name="twitter:title"
            content={`Passionate Bloggers by Arnav Gupta - About`}
          />
          <meta
            name="description"
            content="
Passionate Bloggers is a platform for various bloggers to share their posts with various people"
          />
          <meta
            property="og:description"
            content="
Passionate Bloggers is a platform for various bloggers to share their posts with various people"
          />
          <meta
            name="twitter:decription"
            content={`
Passionate Bloggers is a platform for various bloggers to share their posts with various people`}
          />

          <meta
            property="og:url"
            content={`https://www.passionatebloggers.me/about`}
          />
          <meta
            name="twitter:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
          <meta
            property="og:title"
            content={`Passionate Bloggers by Arnav Gupta - About`}
          />
          <meta property="og:type" content={`About`} />
          <meta
            property="og:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
        </MetaTags>
      </div>
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
