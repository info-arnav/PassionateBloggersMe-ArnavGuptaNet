import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Offline, Online } from "react-detect-offline";
import { Toast } from "react-bootstrap";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Helmet } from "react-helmet";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import Navigation from "../../elements/Navigation";
import Wysiwyg from "../../elements/Wysiwyg";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      inputValue: "",
      editorState: EditorState.createEmpty(),
      data: [],
      sdata: { confirmed: true },
      loading: true,
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  FSubmit = async (event) => {
    event.preventDefault();
    const { requested, sdata, editorState, inputValue } = this.state;
    const users = {
      name: [sdata._id, sdata.email],
    };
    this.setState({ requested: true });
    axios.post(`/request/verification`, { users });
  };
  async componentDidMount() {
    const { user } = this.props.auth;
    await fetch(`/posts/user/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }))
      .then(async (e) => await fetch(`/datas/user/${user.name}`))
      .then((e) => e.json())
      .then((e) => this.setState({ sdata: e }))
      .then((e) => this.setState({ loading: false }));
  }

  render() {
    const { requested, sdata, editorState, inputValue } = this.state;
    const { data, loading } = this.state;
    const { user } = this.props.auth;
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
            <title>{`Infinity - Dashboard`}</title>
            <meta name="twitter:title" content={`Infinity - Dashboard`} />
            <meta
              name="description"
              content="Infinity - Post your blogs on our website here"
            />
            <meta
              property="og:description"
              content="Infinity - Post your blogs on our website here"
            />
            <meta
              name="twitter:description"
              content={`Infinity - Post your blogs on our website here`}
            />
            <meta
              property="og:url"
              content={`https://www.passionatebloggers.me/Dashboard`}
            />
            <meta
              name="twitter:image"
              content="https://www.passionatebloggers.me/logo.png"
            />
            <meta property="og:title" content={`Infinity - Dashboard`} />
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
        {loading ? (
          <div>
            <Navigation />
            <main className="page registration-page">
              <section className="clean-block clean-form dark">
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">
                      <Skeleton />
                    </h2>
                  </div>
                  <form>
                    <div className="form-group">
                      <input
                        value={user.name}
                        className="form-control item"
                        type="text"
                        id="name"
                        name="name"
                        hidden
                      />
                    </div>
                    <div className="form-group">
                      <Skeleton />

                      <Skeleton />
                    </div>
                    <div className="form-group">
                      <Skeleton />
                      <Skeleton />
                    </div>
                    <div className="form-group">
                      <Skeleton />
                    </div>
                  </form>
                </div>
              </section>
            </main>
          </div>
        ) : (
          <div>
            {sdata.confirmed == true ? (
              <div>
                <Navigation />
                <main className="page registration-page">
                  <section className="clean-block clean-form dark">
                    <div className="container">
                      <div className="block-heading">
                        <h2 className="text-info">New Blog</h2>
                      </div>
                      <form action="/teams/submit" method="POST">
                        <div className="form-group">
                          <input
                            value={user.name}
                            className="form-control item"
                            type="text"
                            id="name"
                            name="name"
                            hidden
                          />
                          <input
                            value={sdata._id}
                            className="form-control item"
                            type="text"
                            id="userId"
                            name="userId"
                            hidden
                          />
                        </div>
                        <div className="form-group">
                          <label for="subject">Subject</label>
                          <input
                            className="form-control item"
                            type="text"
                            id="subject"
                            name="subject"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label for="blog">Blog</label>
                          <input
                            className="form-control item"
                            type="text"
                            id="blog"
                            name="blog"
                            hidden
                            required
                            value={draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )}
                          />
                          <div class="wysiwyg">
                            <Editor
                              className="wsiwyg"
                              editorState={editorState}
                              wrapperClassName="demo-wrapper"
                              editorClassName="demo-editor"
                              onEditorStateChange={this.onEditorStateChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-primary btn-block btn-lg"
                            type="submit"
                          >
                            Submit Form
                          </button>
                        </div>
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            ) : (
              <div>
                <Navigation />
                <main className="page registration-page">
                  <section className="clean-block clean-form dark">
                    <div className="container">
                      <div className="block-heading">
                        <h2 className="text-info">Verify</h2>
                      </div>
                      {requested ? (
                        <div>
                          <main className="page registration-page">
                            <section className="clean-block clean-form dark">
                              <h1 />
                              <div className="container">
                                <div className="block-heading"></div>
                                <form action="/verify" method="POST">
                                  <div className="form-group">
                                    <input
                                      value={sdata._id}
                                      className="form-control item"
                                      type="text"
                                      id="name"
                                      name="name"
                                      hidden
                                    />
                                    <label for="blog">Code</label>
                                    <input
                                      className="form-control item"
                                      type="text"
                                      id="code"
                                      name="code"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button
                                      className="btn btn-primary btn-block btn-lg"
                                      type="submit"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                </form>
                                <form onSubmit={this.FSubmit}>
                                  <div className="form-group">
                                    <input
                                      value={sdata._id}
                                      className="form-control item"
                                      type="text"
                                      id="name"
                                      name="name"
                                      hidden
                                    />
                                    <input
                                      value={sdata.email}
                                      className="form-control item"
                                      type="text"
                                      id="email"
                                      name="email"
                                      hidden
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button
                                      className="btn btn-primary btn-block btn-lg"
                                      type="submit"
                                    >
                                      Request Code
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </section>
                          </main>
                        </div>
                      ) : (
                        <div>
                          <main className="page registration-page">
                            <section className="clean-block clean-form dark">
                              <h1 />
                              <div className="container">
                                <div className="block-heading"></div>
                                <form onSubmit={this.FSubmit}>
                                  <div className="form-group">
                                    <input
                                      value={sdata._id}
                                      className="form-control item"
                                      type="text"
                                      id="name"
                                      name="name"
                                      hidden
                                    />
                                    <input
                                      value={sdata.email}
                                      className="form-control item"
                                      type="text"
                                      id="email"
                                      name="email"
                                      hidden
                                    />
                                  </div>
                                  <div className="form-group">
                                    <button
                                      className="btn btn-primary btn-block btn-lg"
                                      type="submit"
                                    >
                                      Request Code
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </section>
                          </main>
                        </div>
                      )}
                    </div>
                  </section>
                </main>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
