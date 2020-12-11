import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Navigation from "./elements/Navigation";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import axios from "axios";
import { Comment, Form, Header } from "semantic-ui-react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

const style = (
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
  />
);
const Single = (props) => {
  const [show, modalHandler] = useState(false);
  const { user } = props.auth;
  const [typedComment, typingComment] = useState("");
  const [refresh, refresher] = useState("unchanged");
  const handleShow = () => {
    modalHandler(true);
  };
  const handleHide = () => {
    modalHandler(false);
  };
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
        .then((e) => localStorage.setItem(`/single/post/${id}`, posts))
        .then((e) => setLoading(false));
    };
    fetcher();
    const secondry = async () => {
      await fetch(`/user/profile/data/${user.name}`)
        .then((e) => e.json())
        .then((e) => setData(e))
        .then((e) =>
          localStorage.setItem(`/user/profile/data/${user.name}`, data)
        );
    };
    secondry();
    refresher("unchanged");
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
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="theme-color" content="#000000" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@InfinityByArnav" />
              <meta name="twitter:creator" content="@arnav95600" />
              <meta property="og:site_name" content="Infinity" />
              <meta property="fb:app_id" content="807904256677081" />
              <title>{`Infinity - ${posts.subject}`}</title>
              <meta
                name="twitter:title"
                content={`Infinity - ${posts.subject}`}
              />
              <meta
                name="description"
                content={`Infinity - ${posts.subject} - ${posts.blog
                  .replace(/(<([^>]+)>)/gi, "")
                  .substring(0, 30)}`}
              />
              <meta
                property="og:description"
                content={`Infinity - ${posts.subject} - ${posts.blog
                  .replace(/(<([^>]+)>)/gi, "")
                  .substring(0, 30)}`}
              />
              <meta
                name="twitter:description"
                content={`Infinity - ${posts.subject} - ${posts.blog
                  .replace(/(<([^>]+)>)/gi, "")
                  .substring(0, 30)}`}
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
                content={`Infinity - ${posts.subject}`}
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
            <link
              rel="manifest"
              href={`${process.env.PUBLIC_URL}/manifest.json`}
            />
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
                          "url(" +
                          `${process.env.PUBLIC_URL +
                            "/blog-teaser-default-full_5.jpg"}` +
                          ")",
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
                    <Button
                      variant="secondary"
                      onClick={(e) => modalHandler(true)}
                    >
                      Comments
                    </Button>
                  </div>
                  <Modal
                    show={show}
                    onHide={handleHide}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div
                        className="comments"
                        style={{
                          height: "200px",
                          width: "100%",
                          overflow: "auto",
                          overflowX: "hidden",
                        }}
                      >
                        <Comment.Group>
                          {posts.comments.map((e) => (
                            <Comment>
                              <Comment.Avatar
                                src={
                                  e.image
                                    ? e.image
                                    : `${process.env.PUBLIC_URL}/l60Hf.png`
                                }
                              />
                              <Comment.Content>
                                <Comment.Author as="a">
                                  <a href={`/profiles&value=${e.user}`}>
                                    {e.user}
                                  </a>
                                </Comment.Author>
                                <Comment.Metadata>
                                  <div>{e.date}</div>
                                </Comment.Metadata>
                                <Comment.Text>{e.comment}</Comment.Text>
                              </Comment.Content>
                            </Comment>
                          ))}
                        </Comment.Group>
                      </div>
                      {user.name ? (
                        <div className="form" style={{ paddingTop: "25px" }}>
                          <form action="/comment/append" method="POST">
                            <p>
                              <input value={posts._id} name="id" hidden></input>
                              <input
                                name="user"
                                value={user.name}
                                hidden
                              ></input>
                              <input
                                name="image"
                                value={user.imagePath}
                                hidden
                              ></input>
                              <input
                                name="date"
                                value={new Date().getTime}
                                hidden
                              ></input>
                              <div className="form-group">
                                <input
                                  required
                                  className="form-control"
                                  placeholder="type your comment here"
                                  value={typedComment}
                                  name="comment"
                                  onChange={(e) =>
                                    typingComment(e.target.value)
                                  }
                                />
                              </div>
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Post
                              </button>
                            </p>
                          </form>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleHide}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
