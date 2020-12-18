import React, { useEffect, useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      status: [],
      email: "",
      password: "",
      errors: {},
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async componentDidMount() {
    await fetch("/user/auth/status")
      .then((e) => e.text())
      .then((e) => this.setState({ status: e }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
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
  render() {
    const { data } = this.state;
    const { user } = this.props.auth;
    const status = this.state.status;
    return (
      <div>
        {user.name ? (
          <nav class="navbar navbar-light navbar-expand-md navigation-clean-button">
            <div class="container" id="adjustments">
              <a class="navbar-brand" href="/">
                Infinity
              </a>
              <div
                class="collapse navbar-collapse"
                id="adjustments navcol-1"
                style={{
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important",
                }}
              >
                <ul id="adjustments" class="nav navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link " href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/projects">
                      Blog
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/feed">
                      Feed
                    </a>
                  </li>
                </ul>
              </div>
              <form action="" id="adjustments">
                <input placeholder="Search" type="search" />
                <i class="fa fa-search"></i>
              </form>
              <span class="navbar-text actions" id="adjustments">
                <a
                  class=" fas fa-user login"
                  href="/active"
                  style={{ paddingLeft: "5px" }}
                ></a>
                <a
                  class="btn btn-light action-button"
                  role="button"
                  onClick={this.onLogoutClick}
                  href="/login"
                >
                  <i class="material-icons">exit_to_app</i>
                </a>
              </span>
            </div>
          </nav>
        ) : (
          <nav class="navbar navbar-light navbar-expand-md navigation-clean-button">
            <div class="container" id="adjustments">
              <a class="navbar-brand" href="/">
                Infinity
              </a>
              <div
                class="collapse navbar-collapse"
                id="adjustments navcol-1"
                style={{
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important",
                }}
              >
                <ul id="adjustments" class="nav navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link " href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/projects">
                      Blog
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/feed">
                      Feed
                    </a>
                  </li>
                </ul>
              </div>
              <form action="" id="adjustments">
                <input placeholder="Search" type="search" />
                <i class="fa fa-search"></i>
              </form>
              <span class="navbar-text actions" id="adjustments">
                <a class="login" href="#" style={{ paddingLeft: "5px" }}>
                  login
                </a>
              </span>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navigation);
