import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

const Single = (props) => {
  const { user } = props.auth;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  id = id.substring(8);
  const [posts, updater] = useState({});
  useEffect(() => {
    const fetcher = async () => {
      await fetch(`/single/post/${id}`)
        .then((e) => e.json())
        .then((e) => updater(e))
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
          <main className="page blog-post">
            <section className="clean-block clean-post dark">
              <div className="container">
                <div className="block-content">
                  <div className="post-body">
                    <h3>
                      <Skeleton />
                    </h3>
                    <div className="post-info">
                      <span>
                        <Skeleton />
                      </span>
                      <span>
                        <Skeleton />
                      </span>
                    </div>
                    <p>
                      <Skeleton />
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div>
          <Navigation />
          <main className="page blog-post">
            <section className="clean-block clean-post dark">
              <div className="container">
                <div className="block-content">
                  {posts.imagePath ? (
                    <div
                      class="post-image"
                      style={{
                        backgroundImage: "url(" + `${posts.imagePath}` + ")",
                      }}
                    />
                  ) : (
                    <div
                      class="post-image"
                      style={{
                        backgroundImage:
                          "url('blog-teaser-default-full_5.jpg')",
                      }}
                    />
                  )}
                  <div className="post-body">
                    <h3>{posts.subject}</h3>
                    {user.name ? (
                      posts.likes.indexOf(data._id) == -1 ? (
                        <form action="/likes/append" method="POST">
                          <input value={posts._id} name="affected" hidden />
                          <input value={data._id} name="affector" hidden />
                          <input
                            value={`/posted${posts._id}`}
                            name="path"
                            hidden
                          />
                          <button
                            className="btn btn-outline-primary btn-sm"
                            type="submit"
                          >
                            like - {posts.likes.length}
                          </button>
                        </form>
                      ) : (
                        <form action="/likes/pop" method="POST">
                          <input value={posts._id} name="affected" hidden />
                          <input value={data._id} name="affector" hidden />
                          <input
                            value={`/posted${posts._id}`}
                            name="path"
                            hidden
                          />
                          <button
                            type="submit"
                            className="btn btn-outline-primary btn-sm"
                          >
                            unlike - {posts.likes.length}
                          </button>
                        </form>
                      )
                    ) : (
                      <div />
                    )}
                    <div className="post-info">
                      <span>
                        By{" "}
                        <a
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                          href={`/profile${posts.name}`}
                        >
                          {posts.name}
                        </a>
                      </span>
                      <span>{posts.date}</span>
                    </div>
                    <p>
                      <div dangerouslySetInnerHTML={{ __html: posts.blog }} />
                    </p>
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

Single.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Single);
