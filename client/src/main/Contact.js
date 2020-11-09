import React from "react";
import Navigation from "../elements/Navigation";
import Footer from "../elements/Footer";

const Contact = () => {
  return (
    <div>
      <Navigation />
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <h1>load</h1>
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
