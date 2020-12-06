import React, { lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import MetaTags from "react-meta-tags";
const Navigation = lazy(() => import("../elements/Navigation"));

const About = () => {
  const renderLoader = () => (
    <p>
      <h2>
        <Skeleton></Skeleton>
      </h2>
    </p>
  );
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
            name="twitter:description"
            content={`
Passionate Bloggers is a platform for various bloggers to share their posts with various people`}
          />

          <meta
            property="og:url"
            content={`https://www.arnavgupta.net/about`}
          />
          <meta
            name="twitter:image"
            content="https://www.arnavgupta.net/logo.png"
          />
          <meta
            property="og:title"
            content={`Passionate Bloggers by Arnav Gupta - About`}
          />
          <meta property="og:type" content={`About`} />
          <meta
            property="og:image"
            content="https://www.arnavgupta.net/logo.png"
          />
        </MetaTags>
      </div>
      <Suspense fallback={renderLoader()}>
        <Navigation />
      </Suspense>
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
