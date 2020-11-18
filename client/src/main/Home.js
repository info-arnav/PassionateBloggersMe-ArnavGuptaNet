import React, { useEffect, useState } from "react";
import Footer from "../elements/Footer";
import Navigation from "../elements/Navigation";
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
        .then((e) => userUpdater(e));
    };
    const postDetails = async () => {
      fetch(`/all/posts`)
        .then((e) => e.json())
        .then((e) => postUpdater(e))
        .then((e) => setLoading(false));
    };
    userDetails().then((e) => postDetails());
  }, []);
  return (
    <div>
      <Navigation />
      <h1>load</h1>
      {user.name ? (
        loading ? (
          <div>
            <Navigation />
            <main className="page blog-post-list">
              <section className="clean-block clean-blog-list dark">
                <h1>load{}</h1>
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
                                      src="https://www.arnavgupta.net/blog-teaser-default-full_5.jpg"
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
                  PassionateBloggers is a platform where various people can
                  share their blogs with each other they can als follow the
                  users they like. We will be adding additional features in the
                  future.
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
