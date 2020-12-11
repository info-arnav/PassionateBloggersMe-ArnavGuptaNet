import React from "react";
import Navigation from "../elements/Navigation";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Footer from "../elements/Footer";

const Contact = () => {
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
          <title>{`Infinity - Contact`}</title>
          <meta name="twitter:title" content={`Infinity - Contact`} />
          <meta
            name="description"
            content="
You can share your queries with Arnav or Infinity Team here"
          />
          <meta
            property="og:description"
            content="
You can share your queries with Arnav or Infinity Team here"
          />
          <meta
            name="twitter:description"
            content={`
You can share your queries with Arnav or Infinity Team here`}
          />
          <meta
            property="og:url"
            content={`https://www.passionatebloggers.me/contact`}
          />
          <meta
            name="twitter:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
          <meta property="og:title" content={`Infinity - Contact`} />
          <meta property="og:type" content={`website`} />
          <meta
            property="og:image"
            content="https://www.passionatebloggers.me/logo.png"
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
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">Contact Us</h2>
            </div>
            <form action="/contact/messages" method="POST">
              <div className="form-group">
                <label>Name</label>
                <input
                  required
                  name="name"
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  required
                  className="form-control"
                  name="subject"
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  required
                  className="form-control"
                  name="email"
                  type="email"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea required className="form-control" name="message" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
