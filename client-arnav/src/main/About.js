import React from "react";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import Footer from "../elements/Footer";
import Navigation from "../elements/Navigation";

const About = () => {
  return (
    <div>
      <div>
        <Helmet>
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo.png`}
          />
          <header>
            <link
              rel="apple-touch-icon"
              href={`${process.env.PUBLIC_URL}/logo.png`}
            />
            <link
              rel="manifest"
              href={`${process.env.PUBLIC_URL}/manifest.json`}
            />
          </header>{" "}
          <meta charset="utf-8" />
          <meta name="copyright" content="Infinity" />
          <div hidden>71441</div>
          <meta name="author" content="Arnav Gupta" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@InfinityByArnav" />
          <meta name="twitter:creator" content="@arnav95600" />
          <meta property="og:site_name" content="Infinity" />
          <meta property="fb:app_id" content="807904256677081" />
          <title>{`Infinity - About`}</title>
          <meta name="twitter:title" content={`Infinity - About`} />
          <meta
            name="description"
            content="
Infinity is a platform for various bloggers to share their posts with various people"
          />
          <meta
            property="og:description"
            content="
Infinity is a platform for various bloggers to share their posts with various people"
          />
          <meta
            name="twitter:description"
            content={`
Infinity is a platform for various bloggers to share their posts with various people`}
          />
          <meta
            property="og:url"
            content={`https://www.arnavgupta.net/about`}
          />
          <meta
            name="twitter:image"
            content="https://www.arnavgupta.net/logo.png"
          />
          <meta property="og:title" content={`Infinity - About`} />
          <meta property="og:type" content={`About`} />
          <meta
            property="og:image"
            content="https://www.arnavgupta.net/logo.png"
          />
        </Helmet>
        <link
          rel="apple-touch-icon"
          href={`${process.env.PUBLIC_URL}/logo.png`}
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.PUBLIC_URL}/logo.png`}
        />
        <header>
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
        </header>
        <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
      </div>
      <Navigation />
      <h1>load</h1>
      <main className="page landing-page">
        <Offline>
          <Toast>
            <Toast.Header>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                className="rounded mr-2"
                alt="logo"
              />
              <strong className="mr-auto">Infinity</strong>
              <small>Currently</small>
            </Toast.Header>
            <Toast.Body>
              Hey ! You are offline, connect to Internet for updates or go to
              home page to see some of posts of people you follow
            </Toast.Body>
          </Toast>
        </Offline>
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
