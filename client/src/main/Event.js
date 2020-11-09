import React, { useEffect, useState, Component } from "react";
import Navigation from "../elements/Navigation";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Event = (props) => {
  const { user } = props.auth;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, updater] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      await fetch("/all/posts")
        .then((e) => e.json())
        .then((e) => updater(e))
        .then((e) => setLoading(false));
    };
    fetcher();
    const secondry = async () => {
      await fetch(`/user/profile/data/${user.name}`)
        .then((e) => e.json())
        .then((e) => setData(e._id));
    };
    secondry();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <Navigation />
          <main className="page blog-post-list">
            <section className="clean-block clean-blog-list dark">
              <h1>load</h1>
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Blogs</h2>
                </div>
                <div className="block-content">
                  <div className="clean-blog-post">
                    <div className="row">
                      <div className="col-lg-7">
                        <h3>
                          <Skeleton />
                        </h3>
                        <Skeleton />
                        <div className="info">
                          <span className="text-muted">
                            <Skeleton />
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
              <h1>load</h1>
              <div className="container">
                <div className="block-heading">
                  <h2 className="text-info">Blogs</h2>
                </div>
                <div className="block-content">
                  {posts.map((datas) => (
                    <div className="clean-blog-post">
                      <div className="row">
                        {datas.imagePath ? (
                          <div class="col-lg-5">
                            <img
                              height="305.76px"
                              class="rounded img-fluid"
                              id="yaya"
                              src={datas.imagePath}
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
                          <h3>{datas.subject} </h3>
                          {user.name ? (
                            datas.likes.indexOf(data) == -1 ? (
                              <form action="/likes/append" method="POST">
                                <input
                                  value={datas._id}
                                  name="affected"
                                  hidden
                                />
                                <input value={data} name="affector" hidden />
                                <input value="/projects" name="path" hidden />
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  type="submit"
                                >
                                  like - {datas.likes.length}
                                </button>
                              </form>
                            ) : (
                              <form action="/likes/pop" method="POST">
                                <input
                                  value={datas._id}
                                  name="affected"
                                  hidden
                                />
                                <input value={data} name="affector" hidden />
                                <input value="/projects" name="path" hidden />
                                <button
                                  type="submit"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  unlike - {datas.likes.length}
                                </button>
                              </form>
                            )
                          ) : (
                            <div />
                          )}
                          <div className="info">
                            <span className="text-muted">
                              {datas.date} by&nbsp;
                              <a href={`/profile${datas.name}`}>{datas.name}</a>
                            </span>
                          </div>

                          <a
                            className="btn btn-outline-primary btn-sm"
                            type="button"
                            href={`/posted${datas._id}`}
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

Event.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Event);
