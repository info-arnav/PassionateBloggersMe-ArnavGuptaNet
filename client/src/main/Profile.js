import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, useParams } from "react-router-dom";
import Navigation from "../elements/Navigation";
const Profile = (props) => {
  const { user } = props.auth;
  const [nndata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, updater] = useState({ followers: [], following: [] });
  const [feedData, feedUpdater] = useState([]);
  let { id } = useParams();
  useEffect((props) => {
    let fetcher = async () => {
      await fetch(`/user/profile/data/${id}`)
        .then((e) => e.json())
        .then((e) => updater(e))
        .then(async (e) => await fetch(`/posts/user/${id}`))
        .then((e) => e.json())
        .then((e) => feedUpdater(e))
        .then((e) => setLoading(false));
    };
    fetcher();
    const secondry = async () => {
      await fetch(`/user/profile/data/${user.name}`)
        .then((e) => e.json())
        .then((e) => setData(e));
    };
    secondry();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <Navigation />
          <main className="page">
            <section className="clean-block about-us">
              <div className="container">
                <h1>load</h1>
                <div className="block-heading">
                  <h2 className="text-info">About</h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6 col-lg-4">
                    <div className="card clean-card text-center">
                      <Skeleton />
                      <div className="card-body info">
                        <h4 className="card-title">
                          <Skeleton />
                        </h4>
                        <p className="card-text">
                          <Skeleton />
                        </p>
                        <p>
                          <Skeleton />
                        </p>
                        <p>
                          <Skeleton />
                        </p>
                        <div className="icons">
                          <a href="#">
                            <Skeleton />
                          </a>
                          <a href="#">
                            <Skeleton />
                          </a>
                          <a href="#">
                            <Skeleton />
                          </a>
                          <a href="#">
                            <Skeleton />
                          </a>
                          <a href="#">
                            <Skeleton />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-heading">
                  <h2 className="text-info">
                    <Skeleton />
                  </h2>
                </div>
                <div className="clean-blog-post">
                  <div className="row">
                    <div className="col-lg-7">
                      <h3>
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
            </section>
          </main>
        </div>
      ) : (
        <div>
          <Navigation />
          <main className="page">
            <section className="clean-block about-us">
              <div className="container">
                <h1>load</h1>
                <div className="block-heading">
                  <h2 className="text-info">About</h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-6 col-lg-4">
                    <div className="card clean-card text-center">
                      {data.imagePath ? (
                        <img
                          className="card-img-top w-100 d-block"
                          src={data.imagePath}
                        />
                      ) : (
                        <img
                          className="card-img-top w-100 d-block"
                          src="l60Hf.png"
                        />
                      )}
                      <div className="card-body info">
                        <h4 className="card-title">{data.name}</h4>
                        <p className="card-text">{data.biology}</p>
                        <p>followers - {data.followers.length}</p>
                        <p>following - {data.following.length}</p>
                        <p>
                          {user.name ? (
                            data.followers.indexOf(nndata._id) == -1 ? (
                              <form action="/follower/append" method="POST">
                                <input
                                  value={data._id}
                                  name="affected"
                                  hidden
                                />
                                <input
                                  value={nndata._id}
                                  name="affector"
                                  hidden
                                />
                                <input value="/projects" name="path" hidden />
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  type="submit"
                                >
                                  follow
                                </button>
                              </form>
                            ) : (
                              <form action="/following/pop" method="POST">
                                <input
                                  value={data._id}
                                  name="affected"
                                  hidden
                                />
                                <input
                                  value={nndata._id}
                                  name="affector"
                                  hidden
                                />
                                <input value="/projects" name="path" hidden />
                                <button
                                  type="submit"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  unfollow
                                </button>
                              </form>
                            )
                          ) : (
                            <div />
                          )}
                        </p>
                        {data.website ? (
                          <a href={data.website}> website</a>
                        ) : (
                          <div />
                        )}
                        <div className="icons">
                          {data.facebook ? (
                            <a href={data.facebook}>
                              <i className="icon-social-facebook" />
                            </a>
                          ) : (
                            <div />
                          )}
                          {data.instagram ? (
                            <a href={data.instagram}>
                              <i className="icon-social-instagram" />
                            </a>
                          ) : (
                            <div />
                          )}
                          {data.twitter ? (
                            <a href={data.twitter}>
                              <i className="icon-social-twitter" />
                            </a>
                          ) : (
                            <div />
                          )}
                          {data.linkedin ? (
                            <a href={data.linkedin}>
                              <i className="icon-social-linkedin" />
                            </a>
                          ) : (
                            <div />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-heading">
                  <h2 className="text-info">Feed</h2>
                </div>
                {feedData.map((e) => (
                  <div>
                    <div className="clean-blog-post">
                      <div className="row">
                        {e.imagePath ? (
                          <div class="col-lg-5">
                            <img
                              height="305.76px"
                              class="rounded img-fluid"
                              id="yaya"
                              src={e.imagePath}
                            />
                          </div>
                        ) : (
                          <div class="col-lg-5">
                            <img
                              height="305.76px"
                              class="rounded img-fluid"
                              id="yaya"
                              src="blog-teaser-default-full_5.jpg"
                            />
                          </div>
                        )}
                        <div className="col-lg-7">
                          <h3>{e.subject}</h3>
                          <p>
                            {user.name ? (
                              e.likes.indexOf(nndata._id) == -1 ? (
                                <form action="/likes/append" method="POST">
                                  <input value={e._id} name="affected" hidden />
                                  <input
                                    value={nndata._id}
                                    name="affector"
                                    hidden
                                  />
                                  <input value="/projects" name="path" hidden />
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    type="submit"
                                  >
                                    like - {e.likes.length}
                                  </button>
                                </form>
                              ) : (
                                <form action="/likes/pop" method="POST">
                                  <input value={e._id} name="affected" hidden />
                                  <input
                                    value={nndata._id}
                                    name="affector"
                                    hidden
                                  />
                                  <input value="/projects" name="path" hidden />
                                  <button
                                    type="submit"
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    unlike - {e.likes.length}
                                  </button>
                                </form>
                              )
                            ) : (
                              <div />
                            )}
                          </p>
                          <div className="info">
                            <span className="text-muted">
                              {e.date} by&nbsp;
                              <a href={`/profile${e.name}`}>{e.name}</a>
                            </span>
                          </div>
                          <a
                            className="btn btn-outline-primary btn-sm"
                            type="button"
                            href={`/posted${e._id}`}
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Profile);
