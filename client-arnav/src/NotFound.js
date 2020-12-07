import React from "react";
import Navigation from "./elements/Navigation";

const NotFound = () => {
  return (
    <div>
      <Navigation />
      <h1>load</h1>
      <main className="page landing-page">
        <section className="clean-block clean-hero">
          <div className="text">
            <h1>
              error 404 page was not found please click appropriate option from
              above
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
