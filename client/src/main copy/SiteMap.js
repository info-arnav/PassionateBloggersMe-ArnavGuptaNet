import React, { useEffect, useState } from "react";
import Navigation from "../elements/Navigation";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const SiteMap = (props) => {
  const { user } = props.auth;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
      await fetch("/all/posts")
        .then((e) => e.json())
        .then((e) => setLoading(false));
    };
    fetcher();
    const secondry = async () => {
      await fetch(`/user/profile/data/${user.name}`).then((e) => e.json());
    };
    secondry();
  }, []);
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
          <title>{`Infinity - User Friendly Site Map`}</title>
          <meta
            name="twitter:title"
            content={`Infinity - User Friendly Site Map`}
          />
          <meta
            name="description"
            content={`Infinity - User Friendly Site Map - overview`}
          />
          <meta
            property="og:description"
            content={`Infinity - User Friendly Site Map - overview`}
          />
          <meta
            name="twitter:description"
            content={`Infinity - User Friendly Site Map - overview`}
          />
          <meta
            property="og:url"
            content={`https://www.arnavgupta.net/sitemap`}
          />
          <meta
            name="twitter:image"
            content="https://www.arnavgupta.net/logo.png"
          />
          <meta
            property="og:title"
            content={`Infinity - User Friendly Site Ma`}
          />
          <meta property="og:type" content={`website`} />
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
      {loading ? (
        <div>
          <Navigation />
          <main className="page blog-post-list">
            <section className="clean-block clean-blog-list dark">
              <h1>load{}</h1>
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Site Map</h2>
                </div>
                <div className="block-content">
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3 className="">
                          <Skeleton />
                        </h3>
                        <div className="info">
                          <span className="text-muted">
                            <Skeleton />
                            &nbsp;
                            <Skeleton />
                          </span>
                        </div>
                        <Skeleton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div>
          <Navigation />
          <main className="page blog-post-list">
            <section className="clean-block clean-blog-list dark">
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Site Map</h2>
                </div>
                <div className="block-content">
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Home</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Contact Us</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/contact`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>License</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/license`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Active Profile</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/active`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Profile</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/profile`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Site Map</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/sitemap`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Make Post</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/dashboard`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Individual Post</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/posted/@username/subject/id`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Register</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/register`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>All Posts</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/projects`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Feed</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/feed`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>Login</h3>
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/login`}
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

SiteMap.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(SiteMap);
