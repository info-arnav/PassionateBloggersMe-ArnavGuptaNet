import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import Axios from "axios";

const Single = (props) => {
  const { user } = props.auth;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liker, refresg] = useState("-1");
  let { id } = useParams();
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
          {" "}
          <div>
            <MetaTags>
              <meta
                name="twitter:title"
                content={`Passionate Bloggers by Arnav Gupta - ${posts.subject}`}
              />
              <meta
                name="description"
                content={`Passionate Bloggers - ${
                  posts.subject
                } - ${posts.blog.substring(0, 30)}`}
              />
              <meta
                property="og:description"
                content={`Passionate Bloggers - ${
                  posts.subject
                } - ${posts.blog.substring(0, 30)}`}
              />
              <meta
                name="twitter:description"
                content={`Passionate Bloggers - ${
                  posts.subject
                } - ${posts.blog.substring(0, 30)}`}
              />

              <meta
                property="og:url"
                content={`https://www.passionatebloggers.me/posted/@${user.name}/${posts.subject}/${posts._id}`}
              />
              <meta
                name="twitter:image"
                content="https://www.passionatebloggers.me/logo.png"
              />
              <meta
                property="og:title"
                content={`Passionate Bloggers by Arnav Gupta - ${posts.subject}`}
              />
              <meta property="og:type" content={`Blog Post`} />
              <meta
                property="og:image"
                content="https://www.passionatebloggers.me/logo.png"
              />
            </MetaTags>
          </div>
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
                          "url('https://www.arnavgupta.net/blog-teaser-default-full_5.jpg')",
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
                            value={`/posted/@${user.name}/${posts.subject}/${posts._id}`}
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
                            value={`/posted/@${user._name}/${posts.subject}/${posts._id}`}
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
                              content={posts.likes.length}
                            />
                            {posts.likes.length}
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
                          href={`/profiles&value=${posts.name}`}
                        >
                          {posts.name}
                        </a>
                      </span>
                      <span>
                        <time datetime={posts.date}>{posts.date}</time>
                      </span>
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

export default connect(mapStateToProps, { logoutUser })(Single);
