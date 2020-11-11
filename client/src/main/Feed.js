import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { connect } from "react-redux";
import { convertFromRaw, ContentState } from "draft-js";
import { EditorState, convertToRaw } from "draft-js";
import { logoutUser } from "../actions/authActions";
import Navigation from "../elements/Navigation";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

class Feed extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      data: [],
      editorState: "",
      funny: false,
      active: {},
      loading: true,
      blog: "",
      imagePath: "",
    };
  }
  handleClose = () => this.setState({ show: false });

  handleShow = (e) => {
    this.setState({
      active: e,
      show: true,
      blog: e.blog,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(e.blog).contentBlocks)
      ),
      funny: true,
      imagePath: e.imagePath,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  async componentDidMount() {
    const { user } = this.props.auth;
    this.state = { show: false };
    await fetch(`/posts/user/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }))
      .then((e) => this.setState({ loading: false }));
  }

  render() {
    const { user } = this.props.auth;
    let {
      show,
      funny,
      active,
      data,
      loading,
      blog,
      imagePath,
      editorState,
      inputValue,
    } = this.state;
    const reversed = [];
    const lenth = data.length - 1;
    for (let i = lenth; i >= 0; i--) {
      reversed.push(data[i]);
    }
    data = reversed;
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
                    <h2 className="text-info">Your Blogs</h2>
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
            <Modal
              show={show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Make Changed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      className="form-control item"
                      type="text"
                      id="idss"
                      value={active._id}
                      name="idss"
                      hidden
                    />
                    <Skeleton />
                  </div>
                  <div className="form-group">
                    <Skeleton />
                    <a href={`/delete/${active._id}`}>delete</a>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          <div>
            <Navigation />
            <main className="page blog-post-list">
              <section className="clean-block clean-blog-list dark">
                <h1>load</h1>
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">Your Blogs</h2>
                  </div>
                  <div className="block-content">
                    {data.map((datas) => (
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
                            <h3>{datas.subject} - </h3>
                            <a
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                              href={`/posteds?value=${datas._id}`}
                            >
                              Read More
                            </a>
                            <div className="info">
                              <span className="text-muted">
                                {datas.date} by&nbsp;
                                <a href="/active">{datas.name}</a>
                              </span>
                            </div>
                            <a
                              variant="primary"
                              onClick={() => {
                                this.handleShow(datas);
                              }}
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
            <Modal
              show={show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Make Changed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form action={`/teams/edit`} method="POST">
                  <div className="form-group">
                    <input
                      className="form-control item"
                      type="text"
                      id="idss"
                      value={active._id}
                      name="idss"
                      hidden
                    />
                    <label for="blog">Blog</label>
                    {funny ? (
                      <input
                        className="form-control item"
                        type="text"
                        id="blog"
                        name="blog"
                        required
                        value={draftToHtml(
                          convertToRaw(editorState.getCurrentContent())
                        )}
                        hidden
                      />
                    ) : (
                      <div />
                    )}
                    <div class="wysiwyg">
                      {funny ? (
                        <Editor
                          className="wsiwyg"
                          editorState={editorState}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={this.onEditorStateChange}
                        />
                      ) : (
                        <div />
                      )}
                    </div>

                    <label for="blog">Image Path</label>
                    <input
                      className="form-control item"
                      type="text"
                      id="imagePath"
                      name="imagePath"
                      value={imagePath}
                      onChange={(e) =>
                        this.setState({ imagePath: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block btn-lg"
                      type="submit"
                    >
                      Make Changes
                    </button>
                    <a href={`/delete/${active._id}`}>delete</a>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

Feed.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Feed);
