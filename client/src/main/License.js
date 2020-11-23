import React from "react";
import MetaTags from "react-meta-tags";
import Footer from "../elements/Footer";
import Navigation from "../elements/Navigation";

const License = () => {
  return (
    <div>
      <div>
        <MetaTags>
          <meta
            name="twitter:title"
            content={`Passionate Bloggers by Arnav Gupta - License`}
          />
          <meta
            name="description"
            content="Passionate Bloggers by Arnav Gupta sticks to a MIT license"
          />
          <meta
            property="og:description"
            content="Passionate Bloggers by Arnav Gupta sticks to a MIT license"
          />
          <meta
            name="twitter:description"
            content={`Passionate Bloggers by Arnav Gupta sticks to a MIT license`}
          />

          <meta
            property="og:url"
            content={`https://www.passionatebloggers.me/feed`}
          />
          <meta property="og:url" content={`https://arnavgupta.net/feed`} />
          <meta
            name="twitter:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
          <meta
            property="og:title"
            content={`Passionate Bloggers by Arnav Gupta - Home`}
          />
          <meta property="og:type" content={`License`} />
          <meta
            property="og:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
        </MetaTags>
      </div>
      <Navigation />
      <h1>load</h1>
      <main className="page landing-page">
        <section className="clean-block about-us">
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">License</h2>
              <p>
                Begin license text. Copyright 2020 Arnav Gupta Permission is
                hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the
                "Software"), to deal in the Software without restriction,
                including without limitation the rights to use, copy, modify,
                merge, publish, distribute, sublicense, and/or sell copies of
                the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions: The
                above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE. End license text.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default License;
