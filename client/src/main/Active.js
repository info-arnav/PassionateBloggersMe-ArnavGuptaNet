import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Skeleton from "react-loading-skeleton";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import Navigation from "../elements/Navigation";

class Active extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      show: false,
      status: [],
      datass: { followers: [], following: [] },
      email: "",
      password: "",
      errors: {},
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      website: "",
      biology: "",
      imagePath: "",
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  async componentDidMount() {
    const { user } = this.props.auth;
    await fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => this.setState({ status: e }))
      .then(async (e) => await fetch(`/user/profile/data/${user.name}`))
      .then((e) => e.json())
      .then((e) =>
        this.setState({
          datass: e,
          instagram: e.instagram,
          facebook: e.facebook,
          twitter: e.twitter,
          linkedin: e.linkedin,
          website: e.website,
          biology: e.biology,
          imagePath: e.imagePath,
        })
      )
      .then((e) => this.setState({ loading: false }));
  }

  render() {
    const { data, show, loading } = this.state;
    const {
      datass,
      instagram,
      facebook,
      twitter,
      linkedin,
      website,
      biology,
      imagePath,
    } = this.state;
    const { user } = this.props.auth;
    const status = this.state.status;
    return (
      <div>
        {loading ? (
          <div>
            {" "}
            <Navigation />
            <main className="page">
              <section className="clean-block about-us">
                <div className="container">
                  <h1>load</h1>
                  <div className="block-heading">
                    <h2 className="text-info">
                      <Skeleton />
                    </h2>
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
                          <center>
                            <Skeleton />
                          </center>
                          <Modal
                            show={show}
                            onHide={this.handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                <Skeleton />
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form>
                                <div className="form-group">
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="name"
                                    value={user.name}
                                    name="name"
                                    hidden
                                  />
                                  <Skeleton />
                                  <Skeleton />
                                </div>
                                <div className="form-group">
                                  <Skeleton />
                                </div>
                              </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <a href="">
                            <Skeleton />
                          </a>
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
                          </div>
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
            {" "}
            <Navigation />
            <main className="page">
              <section className="clean-block about-us">
                <div className="container">
                  <h1>load</h1>
                  <div className="block-heading">
                    <h2 className="text-info">Your Profile</h2>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-6 col-lg-4">
                      <div className="card clean-card text-center">
                        {datass.imagePath ? (
                          <img
                            className="card-img-top w-100 d-block"
                            src={datass.imagePath}
                          />
                        ) : (
                          <img
                            className="card-img-top w-100 d-block"
                            src="l60Hf.png"
                          />
                        )}
                        <div className="card-body info">
                          <h4 className="card-title">{datass.name}</h4>
                          <p className="card-text">{datass.biology}</p>
                          <p>followers - {datass.followers.length}</p>
                          <p>following - {datass.following.length}</p>
                          <center>
                            <a
                              variant="primary"
                              onClick={this.handleShow}
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                            >
                              Edit
                            </a>
                          </center>
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
                              <form action="/profile/update/data" method="POST">
                                Dont leave boxes empty unless you want to delete
                                that data
                                <div className="form-group">
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="name"
                                    value={user.name}
                                    name="name"
                                    hidden
                                  />
                                  <label for="blog">About</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="biology"
                                    name="biology"
                                    value={biology}
                                    onChange={(e) =>
                                      this.setState({ biology: e.target.value })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">Image Link</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="imagePath"
                                    value={imagePath}
name = "imagePath"
                                    onChange={(e) =>
                                      this.setState({
                                        imagePath: e.target.value,
                                      })
                                    }
                                    
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">Website Link</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={website}
                                    onChange={(e) =>
                                      this.setState({ website: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">Instagram</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={instagram}
                                    onChange={(e) =>
                                      this.setState({
                                        instagram: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">facebook</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={facebook}
                                    onChange={(e) =>
                                      this.setState({
                                        facebook: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">twitter</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="twitter"
                                    name="twitter"
                                    value={twitter}
                                    onChange={(e) =>
                                      this.setState({ twitter: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="blog">linkedin</label>
                                  <input
                                    className="form-control item"
                                    type="text"
                                    id="linkedin"
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={(e) =>
                                      this.setState({
                                        linkedin: e.target.value,
                                      })
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
                                </div>
                              </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          {datass.website ? (
                            <a href={datass.website}> website</a>
                          ) : (
                            <div />
                          )}
                          <div className="icons">
                            {datass.facebook ? (
                              <a href={datass.facebook}>
                                <i className="icon-social-facebook" />
                              </a>
                            ) : (
                              <div />
                            )}
                            {datass.instagram ? (
                              <a href={datass.instagram}>
                                <i className="icon-social-instagram" />
                              </a>
                            ) : (
                              <div />
                            )}
                            {datass.twitter ? (
                              <a href={datass.twitter}>
                                <i className="icon-social-twitter" />
                              </a>
                            ) : (
                              <div />
                            )}
                            {datass.linkedin ? (
                              <a href={datass.linkedin}>
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
                </div>
              </section>
            </main>
          </div>
        )}
      </div>
    );
  }
}

Active.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Active);
