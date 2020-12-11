import React, { useEffect, useState } from "react";
import Footer from "../elements/Footer";
import { Helmet } from "react-helmet";
import Navigation from "../elements/Navigation";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, userUpdater] = useState({ following: [] });
  const [postData, postUpdater] = useState({});
  const { user } = props.auth;
  useEffect(() => {
    const userDetails = async () => {
      fetch(`/user/profile/data/${user.name}`)
        .then((e) => e.json())
        .then((e) => userUpdater(e))
        .then((e) =>
          localStorage.setItem(`/user/profile/data/${user.name}`, userData)
        );
    };
    const postDetails = async () => {
      fetch(`/all/posts`)
        .then((e) => e.json())
        .then((e) => postUpdater(e))
        .then((e) => localStorage.setItem(`/all/posts`, postData))
        .then((e) => setLoading(false));
    };
    userDetails().then((e) => postDetails());
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
          <title>{`Infinity - The place where thoughts expand`}</title>
          <meta
            name="twitter:title"
            content={`Infinity - The place where thoughts expand`}
          />
          <meta
            name="description"
            content="Infinity is a platform for various bloggers to share their posts with various people"
          />
          <meta
            property="og:description"
            content="Infinity is a platform for various bloggers to share their posts with various people"
          />
          <meta
            name="twitter:description"
            content={`Infinity is a platform for various bloggers to share their posts with various people`}
          />
          <meta
            property="og:url"
            content={`https://www.passionatebloggers.me/`}
          />
          <meta
            name="twitter:image"
            content="https://www.passionatebloggers.me/logo.png"
          />
          <meta
            property="og:title"
            content={`Infinity - The place were thoughts expand`}
          />
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
      {user.name ? (
        loading ? (
          <div>
            <main className="page blog-post-list">
              <section className="clean-block clean-blog-list dark">
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">Blog Post List</h2>
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
            <main className="page blog-post-list">
              <section className="clean-block clean-blog-list dark">
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">Home</h2>
                  </div>
                  <div className="block-content">
                    {userData.following.map((e) =>
                      postData.map((f) =>
                        e == f.userId ? (
                          <div>
                            <div className="clean-blog-post">
                              <div className="row">
                                {f.imagePath ? (
                                  <div class="col-lg-5">
                                    <img
                                      id="yaya"
                                      class="rounded img-fluid"
                                      src={f.imagePath}
                                    />
                                  </div>
                                ) : (
                                  <div class="col-lg-5">
                                    <img
                                      height="305.76px"
                                      class="rounded img-fluid"
                                      id="yaya"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/blog-teaser-default-full_5.jpg"
                                      }
                                    />
                                  </div>
                                )}
                                <div className="col-lg-7">
                                  <h3>{f.subject}</h3>
                                  <p>
                                    {user.name ? (
                                      f.likes.indexOf(userData._id) == -1 ? (
                                        <form
                                          action="/likes/append"
                                          method="POST"
                                        >
                                          <input
                                            value={f._id}
                                            name="affected"
                                            hidden
                                          />
                                          <input
                                            value={userData._id}
                                            name="affector"
                                            hidden
                                          />
                                          <input
                                            value="/projects"
                                            name="path"
                                            hidden
                                          />
                                          <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="submit"
                                          >
                                            like - {f.likes.length}
                                          </button>
                                        </form>
                                      ) : (
                                        <form action="/likes/pop" method="POST">
                                          <input
                                            value={f._id}
                                            name="affected"
                                            hidden
                                          />
                                          <input
                                            value={userData._id}
                                            name="affector"
                                            hidden
                                          />
                                          <input
                                            value="/projects"
                                            name="path"
                                            hidden
                                          />
                                          <button
                                            type="submit"
                                            className="btn btn-outline-primary btn-sm"
                                          >
                                            unlike -{" "}
                                            <meta
                                              itemprop="ratingValue"
                                              content={f.likes.length}
                                            />
                                            {f.likes.length}
                                          </button>
                                        </form>
                                      )
                                    ) : (
                                      <div />
                                    )}
                                  </p>
                                  <div className="info">
                                    <span className="text-muted">
                                      <time datetime={f.date}>{f.date}</time>{" "}
                                      by&nbsp;
                                      <a href={`/profiles&value=${f.name}`}>
                                        {f.name}
                                      </a>
                                    </span>
                                  </div>
                                  <a
                                    className="btn btn-outline-primary btn-sm"
                                    type="button"
                                    href={`/posted/@${f.name}/${f.subject}/${f._id}`}
                                  >
                                    Read More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div />
                        )
                      )
                    )}
                  </div>
                </div>
              </section>
            </main>
          </div>
        )
      ) : (
        <main className="page landing-page">
          <section className="clean-block clean-hero" id="homeImage">
            <div className="text">
              <h2
                id="newImportant"
                style={{ color: "white", paddingTop: "150px !important" }}
              >
                Blogs for all{" "}
              </h2>
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
                  Infinity is a platform where various people can share their
                  blogs with each other they can als follow the users they like.
                  We will be adding additional features in the future.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Home);
